import type { RichTextComponentPreviewProps } from '@notum-cz/strapi-plugin-tiptap-editor/strapi-admin';
import type { GalleryAttrs } from './gallerySchema';

const GAP: Record<GalleryAttrs['gap'], string> = { small: '4px', medium: '12px', large: '24px' };

export function GalleryPreview({ attrs }: RichTextComponentPreviewProps<GalleryAttrs>) {
  const images = Array.isArray(attrs.images) ? attrs.images : [];
  const columns = Math.min(Math.max(Math.round(Number(attrs.columns)) || 3, 1), 6);
  const ratio = attrs.aspectRatio && attrs.aspectRatio !== 'auto' ? attrs.aspectRatio.replace(':', ' / ') : undefined;

  if (images.length === 0) {
    return (
      <div style={{ padding: '1rem', border: '1px dashed #999', textAlign: 'center', fontSize: 12 }}>
        Empty gallery (use Edit to add images)
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: GAP[attrs.gap] ?? GAP.medium }}>
      {images.map((img, i) => (
        <figure key={`${img.id ?? img.url}-${i}`} style={{ margin: 0 }}>
          <img
            src={img.url}
            alt={img.alt}
            style={{
              width: '100%',
              height: ratio ? '100%' : 'auto',
              aspectRatio: ratio,
              objectFit: attrs.fit ?? 'cover',
              display: 'block',
            }}
          />
          {img.caption && <figcaption style={{ fontSize: 12, marginTop: 4 }}>{img.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}
