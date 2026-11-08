import type { ReactNode } from 'react';
import type { RichTextComponentPreviewProps } from '@notum-cz/strapi-plugin-tiptap-editor/strapi-admin';
import type { MediaTextAttrs } from './mediaTextSchema';

const ALIGN: Record<MediaTextAttrs['verticalAlign'], string> = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
};

export function MediaTextPreview({ attrs, children }: RichTextComponentPreviewProps<MediaTextAttrs>) {
  const width = Math.min(Math.max(Number(attrs.imageWidth) || 33, 10), 80);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: attrs.imagePosition === 'right' ? 'row-reverse' : 'row',
        alignItems: ALIGN[attrs.verticalAlign] ?? 'center',
        gap: '1rem',
      }}
    >
      <div style={{ flex: `0 0 ${width}%`, maxWidth: `${width}%` }}>
        {attrs.imageUrl ? (
          <img src={attrs.imageUrl} alt={attrs.imageAlt} style={{ width: '100%', height: 'auto', display: 'block' }} />
        ) : (
          <div style={{ padding: '1rem', border: '1px dashed #999', textAlign: 'center', fontSize: 12 }}>
            No image (use Edit)
          </div>
        )}
      </div>
      {/* cast: the plugin ships its own @types/react (19) which differs from ours (18) */}
      <div style={{ flex: 1, minWidth: 0 }}>{children as unknown as ReactNode}</div>
    </div>
  );
}
