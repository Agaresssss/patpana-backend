import type { RichTextComponentSchema } from '@notum-cz/strapi-plugin-tiptap-editor/shared';

/**
 * Plain schema (no React) so the frontend renderer can reuse it via `toNodeSpec`.
 */
export const GALLERY_GAPS = ['small', 'medium', 'large'] as const;
export const GALLERY_RATIOS = ['auto', '1:1', '4:3', '3:2', '16:9'] as const;
export const GALLERY_FITS = ['cover', 'contain'] as const;
export const GALLERY_MAX_IMAGES = 30;

export type GalleryImage = {
  id: number | null;
  url: string;
  alt: string;
  caption: string;
};

export type GalleryAttrs = {
  images: GalleryImage[];
  columns: number; // 1-6
  gap: (typeof GALLERY_GAPS)[number];
  aspectRatio: (typeof GALLERY_RATIOS)[number];
  fit: (typeof GALLERY_FITS)[number];
};

export const gallerySchema: RichTextComponentSchema = {
  name: 'gallery',
  label: 'Gallery',
  // atom: no editable content, everything lives in attributes
  attributes: {
    images: { default: [] },
    columns: { default: 3 },
    gap: { default: 'medium' },
    aspectRatio: { default: 'auto' },
    fit: { default: 'cover' },
  },
};
