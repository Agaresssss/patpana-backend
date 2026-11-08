import { useState } from 'react';
import { useStrapiApp } from '@strapi/strapi/admin';
import { Box, Button, Field, Flex, NumberInput, SingleSelect, SingleSelectOption, TextInput, Typography } from '@strapi/design-system';
import type { RichTextComponentFormProps } from '@notum-cz/strapi-plugin-tiptap-editor/strapi-admin';
import {
  GALLERY_FITS,
  GALLERY_GAPS,
  GALLERY_MAX_IMAGES,
  GALLERY_RATIOS,
  type GalleryAttrs,
  type GalleryImage,
} from './gallerySchema';

type Asset = { id: number; url: string; alternativeText?: string | null; caption?: string | null; name?: string };

export function GalleryForm({ attrs, onChange, errors }: RichTextComponentFormProps<GalleryAttrs>) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const MediaLibraryDialog = useStrapiApp('GalleryForm', (state: any) => state.components?.['media-library']);

  const images = Array.isArray(attrs.images) ? attrs.images : [];

  const set = <K extends keyof GalleryAttrs>(key: K, value: GalleryAttrs[K]) => onChange({ ...attrs, [key]: value });

  const updateImage = (index: number, patch: Partial<GalleryImage>) =>
    set(
      'images',
      images.map((img, i) => (i === index ? { ...img, ...patch } : img))
    );

  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= images.length) return;
    const next = [...images];
    [next[index], next[target]] = [next[target], next[index]];
    set('images', next);
  };

  const onSelectAssets = (assets: Asset[]) => {
    // skip assets already in the gallery, keep existing order, append new ones
    const existing = new Set(images.map((i) => i.id));
    const added: GalleryImage[] = assets
      .filter((a) => !existing.has(a.id))
      .map((a) => ({
        id: a.id,
        url: a.url,
        alt: a.alternativeText || a.name || '',
        caption: a.caption || '',
      }));
    set('images', [...images, ...added].slice(0, GALLERY_MAX_IMAGES));
    setPickerOpen(false);
  };

  return (
    <Flex direction="column" alignItems="stretch" gap={4}>
      <Box>
        <Flex justifyContent="space-between" alignItems="center">
          <Typography variant="pi" fontWeight="bold">
            Images ({images.length}/{GALLERY_MAX_IMAGES})
          </Typography>
          <Button
            variant="secondary"
            onClick={() => setPickerOpen(true)}
            disabled={!MediaLibraryDialog || images.length >= GALLERY_MAX_IMAGES}
          >
            Add images
          </Button>
        </Flex>
        {!MediaLibraryDialog && (
          <Typography variant="pi" textColor="danger600">
            Media Library is not available
          </Typography>
        )}
        {errors.images && (
          <Typography variant="pi" textColor="danger600">
            {errors.images}
          </Typography>
        )}
      </Box>

      {images.map((img, index) => (
        <Flex key={`${img.id ?? img.url}-${index}`} gap={3} alignItems="flex-start">
          <img src={img.url} alt={img.alt} style={{ width: 72, height: 72, objectFit: 'cover', flex: '0 0 auto' }} />
          <Flex direction="column" alignItems="stretch" gap={2} style={{ flex: 1, minWidth: 0 }}>
            <TextInput
              aria-label="Alt text"
              placeholder="Alt text"
              value={img.alt}
              onChange={(e: any) => updateImage(index, { alt: e.target.value })}
            />
            <TextInput
              aria-label="Caption"
              placeholder="Caption (optional)"
              value={img.caption}
              onChange={(e: any) => updateImage(index, { caption: e.target.value })}
            />
          </Flex>
          <Flex direction="column" gap={1}>
            <Button size="S" variant="tertiary" onClick={() => move(index, -1)} disabled={index === 0}>
              Up
            </Button>
            <Button size="S" variant="tertiary" onClick={() => move(index, 1)} disabled={index === images.length - 1}>
              Down
            </Button>
            <Button size="S" variant="danger-light" onClick={() => set('images', images.filter((_, i) => i !== index))}>
              Remove
            </Button>
          </Flex>
        </Flex>
      ))}

      <Flex gap={4} alignItems="flex-start" wrap="wrap">
        <Field.Root error={errors.columns}>
          <Field.Label>Columns (1-6)</Field.Label>
          <NumberInput value={attrs.columns} onValueChange={(v: number | undefined) => set('columns', v ?? 3)} />
          <Field.Error />
        </Field.Root>

        <Field.Root>
          <Field.Label>Gap</Field.Label>
          <SingleSelect value={attrs.gap} onChange={(v: any) => set('gap', v)}>
            {GALLERY_GAPS.map((g) => (
              <SingleSelectOption key={g} value={g}>
                {g}
              </SingleSelectOption>
            ))}
          </SingleSelect>
        </Field.Root>

        <Field.Root>
          <Field.Label>Aspect ratio</Field.Label>
          <SingleSelect value={attrs.aspectRatio} onChange={(v: any) => set('aspectRatio', v)}>
            {GALLERY_RATIOS.map((r) => (
              <SingleSelectOption key={r} value={r}>
                {r}
              </SingleSelectOption>
            ))}
          </SingleSelect>
        </Field.Root>

        <Field.Root>
          <Field.Label>Image fit</Field.Label>
          <SingleSelect value={attrs.fit} onChange={(v: any) => set('fit', v)}>
            {GALLERY_FITS.map((f) => (
              <SingleSelectOption key={f} value={f}>
                {f}
              </SingleSelectOption>
            ))}
          </SingleSelect>
        </Field.Root>
      </Flex>

      {pickerOpen && MediaLibraryDialog && (
        <MediaLibraryDialog
          onClose={() => setPickerOpen(false)}
          onSelectAssets={onSelectAssets}
          allowedTypes={['images']}
          multiple
        />
      )}
    </Flex>
  );
}
