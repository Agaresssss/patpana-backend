import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  'tiptap-editor': {
    config: {
      theme: {
        // Palette for textColor / highlightColor pickers (the buttons are hidden without it)
        colors: [
          { label: 'Black', color: '#000000' },
          { label: 'Dark gray', color: '#4A4A4A' },
          { label: 'Gray', color: '#9CA3AF' },
          { label: 'Red', color: '#E53E3E' },
          { label: 'Orange', color: '#DD6B20' },
          { label: 'Green', color: '#38A169' },
          { label: 'Blue', color: '#3182CE' },
        ],
      },
      presets: {
        // Toolbar for article body: pick this in Content-Type Builder -> field -> Editor Preset
        article: {
          bold: true,
          italic: true,
          underline: true,
          strike: true,
          heading: { levels: [1, 2, 3, 4] },
          bulletList: true,
          orderedList: true,
          blockquote: true,
          hardBreak: true, // Shift+Enter
          horizontalRule: true,
          link: {
            HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
          },
          table: true,
          textAlign: true,
          textColor: true,
          highlightColor: true,
          mediaLibrary: { resize: { enabled: true } },
          components: { mediaText: true, gallery: true },
        },
        // Short text such as captions
        minimal: {
          bold: true,
          italic: true,
          link: true,
        },
      },
    },
  },
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'smtp.gmail.com'),
        port: env.int('SMTP_PORT', 465),
        secure: env.bool('SMTP_SECURE', true),
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
      },
      settings: {
        defaultFrom: `"Patpana Website" <${env('SMTP_USERNAME')}>`,
        defaultReplyTo: env('SMTP_USERNAME'),
      },
    },
  },
});

export default config;
