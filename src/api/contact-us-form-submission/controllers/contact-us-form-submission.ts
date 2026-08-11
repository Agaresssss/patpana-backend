import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::contact-us-form-submission.contact-us-form-submission',
  ({ strapi }) => ({
    async create(ctx) {
      const response = await super.create(ctx);

      const { name, email, tel, message } = ctx.request.body.data;

      try {
        await strapi.plugin('email').service('email').send({
          to: process.env.SMTP_USERNAME,
          from: `"${name} via Contact Us Form" <${process.env.SMTP_USERNAME}>`,
          replyTo: email,
          subject: `[Contact Us] ข้อความใหม่จาก ${name}`,
          text: `
ชื่อ: ${name}
อีเมล: ${email}
เบอร์โทร: ${tel || '-'}

ข้อความ:
${message}
          `,
          html: `
            <h3>มีข้อความใหม่จากฟอร์มติดต่อ (Contact Us)</h3>
            <p><b>ชื่อ:</b> ${name}</p>
            <p><b>อีเมล:</b> ${email}</p>
            <p><b>เบอร์โทร:</b> ${tel || '-'}</p>
            <p><b>ข้อความ:</b><br/>${message}</p>
          `,
        });
      } catch (err) {
        strapi.log.error('Failed to send contact-us-form-submission email', err);
      }

      return response;
    },
  })
);
