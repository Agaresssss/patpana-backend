import type { Schema, Struct } from '@strapi/strapi';

export interface FooterLegalLink extends Struct.ComponentSchema {
  collectionName: 'components_footer_legal_links';
  info: {
    displayName: 'Legal Link';
    icon: 'file';
    description: 'Footer legal/policy link';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FooterSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_footer_social_links';
  info: {
    displayName: 'Social Link';
    icon: 'link';
    description: 'Social media platform link';
  };
  attributes: {
    platform: Schema.Attribute.Enumeration<['facebook', 'line', 'x']> &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface NavNavChild extends Struct.ComponentSchema {
  collectionName: 'components_nav_nav_children';
  info: {
    displayName: 'Nav Child';
    icon: 'arrowRight';
    description: 'Sub-item of a dropdown menu';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface NavNavItem extends Struct.ComponentSchema {
  collectionName: 'components_nav_nav_items';
  info: {
    displayName: 'Nav Item';
    icon: 'layer';
    description: 'Top-level nav menu item, supports one level of dropdown children';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
    children: Schema.Attribute.Component<'nav.nav-child', true>;
  };
}

export interface SharedHeroBanner extends Struct.ComponentSchema {
  collectionName: 'components_shared_hero_banners';
  info: {
    displayName: 'Hero Banner';
    icon: 'picture';
    description: 'Page hero with title and background image';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
    bgImage: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'Seo';
    icon: 'search';
    description: 'SEO meta fields for page single types';
  };
  attributes: {
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    ogImage: Schema.Attribute.Media<'images'>;
    canonicalURL: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'footer.legal-link': FooterLegalLink;
      'footer.social-link': FooterSocialLink;
      'nav.nav-child': NavNavChild;
      'nav.nav-item': NavNavItem;
      'shared.hero-banner': SharedHeroBanner;
      'shared.seo': SharedSeo;
    }
  }
}
