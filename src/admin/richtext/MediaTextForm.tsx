import { useState } from 'react';
import { useStrapiApp } from '@strapi/strapi/admin';
import { Box, Button, Field, Flex, NumberInput, SingleSelect, SingleSelectOption, TextInput, Typography } from '@strapi/design-system';
import type { RichTextComponentFormProps } from '@notum-cz/strapi-plugin-tiptap-editor/strapi-admin';
import { MEDIA_TEXT_ALIGNS, MEDIA_TEXT_POSITIONS, type MediaTextAttrs } from './mediaTextSchema';

type Asset = { id: number; url: string; alternativeText?: string | null; name?: string };

export function MediaTextForm({ attrs, onChange, errors }: RichTextComponentFormProps<MediaTextAttrs>) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const MediaLibraryDialog = useStrapiApp('MediaTextForm', (state: any) => state.components?.['media-library']);

  const set = <K extends keyof MediaTextAttrs>(key: K, value: MediaTextAttrs[K]) =>
    onChange({ ...attrs, [key]: value });

  const onSelectAssets = (assets: Asset[]) => {
    const asset = assets[0];
    if (asset) {
      onChange({
        ...attrs,
        imageId: asset.id,
        imageUrl: asset.url,
        imageAlt: attrs.imageAlt || asset.alternativeText || asset.name || '',
      });
    }
    setPickerOpen(false);
  };

  return (
    <Flex direction="column" alignItems="stretch" gap={4}>
      <Box>
        <Typography variant="pi" fontWeight="bold">
          Image
        </Typography>
        <Flex gap={3} marginTop={2} alignItems="center">
          {attrs.imageUrl ? (
            <img src={attrs.imageUrl} alt={attrs.imageAlt} style={{ width: 96, height: 96, objectFit: 'contain' }} />
          ) : (
            <Typography textColor="neutral600">No image selected</Typography>
          )}
          <Button variant="secondary" onClick={() => setPickerOpen(true)} disabled={!MediaLibraryDialog}>
            {attrs.imageUrl ? 'Change image' : 'Select image'}
          </Button>
          {attrs.imageUrl && (
            <Button variant="tertiary" onClick={() => onChange({ ...attrs, imageId: null, imageUrl: null })}>
              Remove
            </Button>
          )}
        </Flex>
        {!MediaLibraryDialog && (
          <Typography variant="pi" textColor="danger600">
            Media Library is not available
          </Typography>
        )}
        {errors.imageUrl && (
          <Typography variant="pi" textColor="danger600">
            {errors.imageUrl}
          </Typography>
        )}
      </Box>

      <Field.Root>
        <Field.Label>Alt text</Field.Label>
        <TextInput value={attrs.imageAlt} onChange={(e: any) => set('imageAlt', e.target.value)} />
      </Field.Root>

      <Flex gap={4} alignItems="flex-start">
        <Field.Root>
          <Field.Label>Image position</Field.Label>
          <SingleSelect value={attrs.imagePosition} onChange={(v: any) => set('imagePosition', v)}>
            {MEDIA_TEXT_POSITIONS.map((p) => (
              <SingleSelectOption key={p} value={p}>
                {p}
              </SingleSelectOption>
            ))}
          </SingleSelect>
        </Field.Root>

        <Field.Root>
          <Field.Label>Vertical align</Field.Label>
          <SingleSelect value={attrs.verticalAlign} onChange={(v: any) => set('verticalAlign', v)}>
            {MEDIA_TEXT_ALIGNS.map((a) => (
              <SingleSelectOption key={a} value={a}>
                {a}
              </SingleSelectOption>
            ))}
          </SingleSelect>
        </Field.Root>

        <Field.Root error={errors.imageWidth}>
          <Field.Label>Image width (%)</Field.Label>
          <NumberInput value={attrs.imageWidth} onValueChange={(v: number | undefined) => set('imageWidth', v ?? 33)} />
          <Field.Error />
        </Field.Root>
      </Flex>

      {pickerOpen && MediaLibraryDialog && (
        <MediaLibraryDialog
          onClose={() => setPickerOpen(false)}
          onSelectAssets={onSelectAssets}
          allowedTypes={['images']}
          multiple={false}
        />
      )}
    </Flex>
  );
}
