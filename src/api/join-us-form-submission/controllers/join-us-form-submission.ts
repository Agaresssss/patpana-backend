import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::join-us-form-submission.join-us-form-submission',
  ({ strapi }) => ({
    async create(ctx) {
      const response = await super.create(ctx);

      const { name, email, tel, position, message } = ctx.request.body.data;

      try {
        await strapi.plugin('email').service('email').send({
          to: process.env.SMTP_USERNAME,
          from: `"${name} via Join Us Form" <${process.env.SMTP_USERNAME}>`,
          replyTo: email,
          subject: `[Join Us] ใบสมัครใหม่จาก ${name} (${position})`,
          text: `
ชื่อ: ${name}
อีเมล: ${email}
เบอร์โทร: ${tel || '-'}
ตำแหน่ง: ${position}

ข้อความ:
${message}
          `,
          html: `
            <h3>มีใบสมัครใหม่จากฟอร์ม Join Us</h3>
            <p><b>ชื่อ:</b> ${name}</p>
            <p><b>อีเมล:</b> ${email}</p>
            <p><b>เบอร์โทร:</b> ${tel || '-'}</p>
            <p><b>ตำแหน่ง:</b> ${position}</p>
            <p><b>ข้อความ:</b><br/>${message}</p>
          `,
        });
      } catch (err) {
        strapi.log.error('Failed to send join-us-form-submission email', err);
      }

      return response;
    },
  })
);
