import type { StrapiApp } from '@strapi/strapi/admin';
import {
  defineRichTextComponent,
  registerRichTextComponent,
} from '@notum-cz/strapi-plugin-tiptap-editor/strapi-admin';
import { GalleryForm } from './richtext/GalleryForm';
import { GalleryPreview } from './richtext/GalleryPreview';
import { gallerySchema, type GalleryAttrs } from './richtext/gallerySchema';
import { MediaTextForm } from './richtext/MediaTextForm';
import { MediaTextPreview } from './richtext/MediaTextPreview';
import { mediaTextSchema, type MediaTextAttrs } from './richtext/mediaTextSchema';

const mediaTextComponent = defineRichTextComponent<MediaTextAttrs>({
  ...mediaTextSchema,
  label: 'Media + Text',
  defaultAttrs: {
    imagePosition: 'left',
    imageWidth: 33,
    verticalAlign: 'center',
  },
  preview: MediaTextPreview,
  form: MediaTextForm,
  dialog: { width: 'min(40rem, 95vw)' },
  validate: (attrs) => {
    const errors: Partial<Record<keyof MediaTextAttrs, string>> = {};
    if (!attrs.imageUrl) errors.imageUrl = 'Please select an image';
    const w = Number(attrs.imageWidth);
    if (!(w >= 10 && w <= 80)) errors.imageWidth = 'Width must be between 10 and 80';
    return Object.keys(errors).length ? errors : null;
  },
});

const galleryComponent = defineRichTextComponent<GalleryAttrs>({
  ...gallerySchema,
  label: 'Gallery',
  defaultAttrs: { images: [], columns: 3, gap: 'medium', aspectRatio: 'auto', fit: 'cover' },
  preview: GalleryPreview,
  form: GalleryForm,
  dialog: { width: 'min(48rem, 95vw)' },
  validate: (attrs) => {
    const errors: Partial<Record<keyof GalleryAttrs, string>> = {};
    if (!Array.isArray(attrs.images) || attrs.images.length === 0) errors.images = 'Please add at least one image';
    const c = Number(attrs.columns);
    if (!(Number.isInteger(c) && c >= 1 && c <= 6)) errors.columns = 'Columns must be a whole number from 1 to 6';
    return Object.keys(errors).length ? errors : null;
  },
});

export default {
  config: {
    locales: [],
  },
  register() {
    // Must run before any rich-text field mounts
    registerRichTextComponent(mediaTextComponent);
    registerRichTextComponent(galleryComponent);
  },
  bootstrap(_app: StrapiApp) {},
};
