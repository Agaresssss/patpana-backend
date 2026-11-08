import type { RichTextComponentSchema } from '@notum-cz/strapi-plugin-tiptap-editor/shared';

/**
 * Plain schema (no React). Keep it free of admin-only imports so the frontend renderer
 * can reuse it via `toNodeSpec` and stay in sync with the editor.
 */
export const MEDIA_TEXT_POSITIONS = ['left', 'right'] as const;
export const MEDIA_TEXT_ALIGNS = ['top', 'center', 'bottom'] as const;

export type MediaTextAttrs = {
  imageId: number | null;
  imageUrl: string | null;
  imageAlt: string;
  imagePosition: (typeof MEDIA_TEXT_POSITIONS)[number];
  imageWidth: number; // percent of the row
  verticalAlign: (typeof MEDIA_TEXT_ALIGNS)[number];
};

export const mediaTextSchema: RichTextComponentSchema = {
  name: 'mediaText',
  label: 'Media + Text',
  // container: the text next to the image is edited in place
  content: 'block+',
  attributes: {
    imageId: { default: null },
    imageUrl: { default: null },
    imageAlt: { default: '' },
    imagePosition: { default: 'left' },
    imageWidth: { default: 33 },
    verticalAlign: { default: 'center' },
  },
};
