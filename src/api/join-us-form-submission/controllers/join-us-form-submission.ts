import fs from 'node:fs';
import path from 'node:path';
import type { Core } from '@strapi/strapi';
import {
  escapeHtml,
  nl2br,
  respondError,
  respondOk,
  singleLine,
  validateFields,
  type FieldError,
} from '../../../utils/form';

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;

const getFilePath = (file: any): string => file.filepath || file.path;

// extension -> mime type + magic bytes at file start
const ALLOWED_FILES: Record<string, { mime: string; magic: number[] }> = {
  '.pdf': { mime: 'application/pdf', magic: [0x25, 0x50, 0x44, 0x46, 0x2d] }, // %PDF-
  '.docx': {
    mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    magic: [0x50, 0x4b, 0x03, 0x04], // zip container
  },
  '.doc': {
    mime: 'application/msword',
    magic: [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1], // OLE2 container
  },
};

const getExt = (file: any): string =>
  path.extname(String(file.originalFilename || file.name || '')).toLowerCase();

const isAllowedFile = (file: any): boolean => {
  const rule = ALLOWED_FILES[getExt(file)];
  if (!rule) return false;
  try {
    const fd = fs.openSync(getFilePath(file), 'r');
    const buf = Buffer.alloc(rule.magic.length);
    const read = fs.readSync(fd, buf, 0, buf.length, 0);
    fs.closeSync(fd);
    return read === buf.length && rule.magic.every((b, i) => buf[i] === b);
  } catch {
    return false;
  }
};

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async create(ctx) {
    const raw = ctx.request.files?.file;
    const files: any[] = Array.isArray(raw) ? raw : raw ? [raw] : [];

    try {
      if (!ctx.is('multipart/form-data')) {
        return respondError(ctx, 400, 'invalid_content_type', 'content-type must be multipart/form-data');
      }

      const result = validateFields(ctx.request.body ?? {}, {
        name: { max: 255, required: true },
        email: { max: 255, required: true, email: true },
        tel: { max: 20, required: true },
        position: { max: 255, required: true },
        message: { max: 5000, required: true },
      });

      const errors: FieldError[] = 'errors' in result ? [...result.errors] : [];

      const file = files[0];
      if (files.length > 1) {
        errors.push({ path: 'file', code: 'file_too_many', message: 'only one file is allowed' });
      } else if (!file) {
        errors.push({ path: 'file', code: 'required', message: 'file is required' });
      } else if ((file.size ?? 0) > MAX_FILE_SIZE) {
        errors.push({
          path: 'file',
          code: 'file_too_large',
          params: { maxMb: MAX_FILE_SIZE_MB },
          message: `file must be ${MAX_FILE_SIZE_MB} MB or smaller`,
        });
      } else if (!isAllowedFile(file)) {
        errors.push({
          path: 'file',
          code: 'file_type_invalid',
          message: 'only .doc, .docx and .pdf files are allowed',
        });
      }

      if (errors.length || !('values' in result)) {
        return respondError(ctx, 400, 'validation_failed', 'Validation failed', errors);
      }

      const { name, email, tel, position, message } = result.values;

      try {
        await strapi.plugin('email').service('email').send({
          to: process.env.JOIN_US_TO || process.env.SMTP_USERNAME,
          from: `"${singleLine(name).replace(/"/g, '')} via Join Us Form" <${process.env.SMTP_USERNAME}>`,
          replyTo: email,
          subject: `[Join Us] ใบสมัครใหม่จาก ${singleLine(name)} (${singleLine(position)})`,
          text: `ชื่อ: ${name}\nอีเมล: ${email}\nเบอร์โทร: ${tel || '-'}\nตำแหน่ง: ${position}\n\nข้อความ:\n${message}`,
          html: `
            <h3>มีใบสมัครใหม่จากฟอร์ม Join Us</h3>
            <p><b>ชื่อ:</b> ${escapeHtml(name)}</p>
            <p><b>อีเมล:</b> ${escapeHtml(email)}</p>
            <p><b>เบอร์โทร:</b> ${escapeHtml(tel || '-')}</p>
            <p><b>ตำแหน่ง:</b> ${escapeHtml(position)}</p>
            <p><b>ข้อความ:</b><br/>${nl2br(message)}</p>
          `,
          // The Strapi email provider blocks attachments[].path (LFI/SSRF guard), so pass a stream.
          // The temp file is deleted in `finally`, after send() has finished reading it.
          attachments: [
            {
              filename: path.basename(String(file.originalFilename || `resume${getExt(file)}`)),
              content: fs.createReadStream(getFilePath(file)),
              contentType: ALLOWED_FILES[getExt(file)].mime,
            },
          ],
        });
      } catch (err) {
        strapi.log.error('Failed to send join-us email', err);
        return respondError(ctx, 500, 'send_failed', 'Failed to send application');
      }

      return respondOk(ctx);
    } finally {
      // temp upload files are not needed after sending
      for (const f of files) {
        fs.promises.unlink(getFilePath(f)).catch(() => {});
      }
    }
  },
});
