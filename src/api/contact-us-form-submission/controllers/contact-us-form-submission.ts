import type { Core } from '@strapi/strapi';
import { nl2br, escapeHtml, respondError, respondOk, singleLine, validateFields } from '../../../utils/form';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async create(ctx) {
    if (!ctx.is('multipart/form-data')) {
      return respondError(ctx, 400, 'invalid_content_type', 'content-type must be multipart/form-data');
    }

    const result = validateFields(ctx.request.body ?? {}, {
      name: { max: 255, required: true },
      email: { max: 255, required: true, email: true },
      tel: { max: 15, required: true },
      message: { max: 5000, required: true },
    });
    if ('errors' in result) {
      return respondError(ctx, 400, 'validation_failed', 'Validation failed', result.errors);
    }

    const { name, email, tel, message } = result.values;

    try {
      await strapi.plugin('email').service('email').send({
        to: process.env.CONTACT_US_TO || process.env.SMTP_USERNAME,
        from: `"${singleLine(name).replace(/"/g, '')} via Contact Us Form" <${process.env.SMTP_USERNAME}>`,
        replyTo: email,
        subject: `[Contact Us] ข้อความใหม่จาก ${singleLine(name)}`,
        text: `ชื่อ: ${name}\nอีเมล: ${email}\nเบอร์โทร: ${tel}\n\nข้อความ:\n${message}`,
        html: `
          <h3>มีข้อความใหม่จากฟอร์มติดต่อ (Contact Us)</h3>
          <p><b>ชื่อ:</b> ${escapeHtml(name)}</p>
          <p><b>อีเมล:</b> ${escapeHtml(email)}</p>
          <p><b>เบอร์โทร:</b> ${escapeHtml(tel)}</p>
          <p><b>ข้อความ:</b><br/>${nl2br(message)}</p>
        `,
      });
    } catch (err) {
      strapi.log.error('Failed to send contact-us email', err);
      return respondError(ctx, 500, 'send_failed', 'Failed to send message');
    }

    return respondOk(ctx);
  },
});
