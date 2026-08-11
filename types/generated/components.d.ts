import type { Schema, Struct } from '@strapi/strapi';

export interface BlockBrandName extends Struct.ComponentSchema {
  collectionName: 'components_block_brand_names';
  info: {
    description: 'Meaning-of-our-name section with shuffled images';
    displayName: 'Brand Name';
    icon: 'typhoon';
  };
  attributes: {
    bodyMd: Schema.Attribute.RichText;
    design: Schema.Attribute.Component<'shared.design', false>;
    images: Schema.Attribute.Component<'elements.brand-image', true>;
    sectionTitle: Schema.Attribute.String;
    subtitle: Schema.Attribute.String;
  };
}

export interface BlockBrandSlogan extends Struct.ComponentSchema {
  collectionName: 'components_block_brand_slogans';
  info: {
    description: 'Full-bleed slogan banner';
    displayName: 'Brand Slogan';
    icon: 'quote';
  };
  attributes: {
    design: Schema.Attribute.Component<'shared.design', false>;
    slogan: Schema.Attribute.String;
  };
}

export interface BlockCardGrid extends Struct.ComponentSchema {
  collectionName: 'components_block_card_grids';
  info: {
    description: 'Grid of showcase / stat / text cards';
    displayName: 'Card Grid';
    icon: 'grid';
  };
  attributes: {
    cards: Schema.Attribute.Component<'elements.grid-card', true>;
    cardVariant: Schema.Attribute.Enumeration<
      ['showcase', 'feature', 'media-card', 'stat']
    >;
    design: Schema.Attribute.Component<'shared.design', false>;
    heading: Schema.Attribute.String;
  };
}

export interface BlockChannel extends Struct.ComponentSchema {
  collectionName: 'components_block_channels';
  info: {
    description: 'Distribution channels section';
    displayName: 'Channel';
    icon: 'shoppingCart';
  };
  attributes: {
    bg: Schema.Attribute.Enumeration<['white', 'cream', 'orange']>;
    content: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface BlockClientLogos extends Struct.ComponentSchema {
  collectionName: 'components_block_client_logos';
  info: {
    description: 'Grid of client logos';
    displayName: 'Client Logos';
    icon: 'picture';
  };
  attributes: {
    clients: Schema.Attribute.Component<'elements.client-logo', true>;
    design: Schema.Attribute.Component<'shared.design', false>;
    sectionTitle: Schema.Attribute.String;
  };
}

export interface BlockContactForm extends Struct.ComponentSchema {
  collectionName: 'components_block_contact_forms';
  info: {
    description: 'Contact section with a trusted map embed';
    displayName: 'Contact Form';
    icon: 'envelop';
  };
  attributes: {
    design: Schema.Attribute.Component<'shared.design', false>;
    mapTitle: Schema.Attribute.String;
    mapUrl: Schema.Attribute.Text;
    sectionTitle: Schema.Attribute.String;
  };
}

export interface BlockExpertTeams extends Struct.ComponentSchema {
  collectionName: 'components_block_expert_teams';
  info: {
    description: 'Contact cards for expert teams';
    displayName: 'Expert Teams';
    icon: 'user';
  };
  attributes: {
    design: Schema.Attribute.Component<'shared.design', false>;
    sectionTitle: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
    teams: Schema.Attribute.Component<'elements.expert-team', true>;
  };
}

export interface BlockFarm extends Struct.ComponentSchema {
  collectionName: 'components_block_farms';
  info: {
    description: 'FARM business section';
    displayName: 'Farm';
    icon: 'house';
  };
  attributes: {
    cards: Schema.Attribute.Component<'elements.info-card', true>;
    cardsTitle: Schema.Attribute.String;
    contact: Schema.Attribute.Component<'shared.department-contact', false>;
    descriptionMd: Schema.Attribute.RichText;
    design: Schema.Attribute.Component<'shared.design', false>;
    items: Schema.Attribute.Component<'elements.farm-item', true>;
    steps: Schema.Attribute.Component<'elements.farm-step', true>;
    stepsBgImage: Schema.Attribute.Media<'images'>;
    stepsDescriptionMd: Schema.Attribute.RichText;
    stepsTitle: Schema.Attribute.String;
    sustainDescMd: Schema.Attribute.RichText;
    sustainImages: Schema.Attribute.Media<'images', true>;
    sustainTitle: Schema.Attribute.String;
    tagline: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface BlockFeatureList extends Struct.ComponentSchema {
  collectionName: 'components_block_feature_lists';
  info: {
    description: 'Heading with a list of feature items';
    displayName: 'Feature List';
    icon: 'bulletList';
  };
  attributes: {
    design: Schema.Attribute.Component<'shared.design', false>;
    heading: Schema.Attribute.String;
    items: Schema.Attribute.Component<'elements.feature-item', true>;
  };
}

export interface BlockFeed extends Struct.ComponentSchema {
  collectionName: 'components_block_feeds';
  info: {
    description: 'FEED business section';
    displayName: 'Feed';
    icon: 'seed';
  };
  attributes: {
    certBody: Schema.Attribute.Text;
    certLogos: Schema.Attribute.Media<'images', true>;
    checklist: Schema.Attribute.Component<'elements.check-item', true>;
    checklistImage: Schema.Attribute.Media<'images'>;
    contact: Schema.Attribute.Component<'shared.department-contact', false>;
    descriptionMd: Schema.Attribute.RichText;
    design: Schema.Attribute.Component<'shared.design', false>;
    detailsTitle: Schema.Attribute.String;
    highlights: Schema.Attribute.Component<'elements.feed-highlight', true>;
    standardsTitle: Schema.Attribute.String;
    tagline: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface BlockFood extends Struct.ComponentSchema {
  collectionName: 'components_block_foods';
  info: {
    description: 'FOOD business section';
    displayName: 'Food';
    icon: 'restaurant';
  };
  attributes: {
    contact: Schema.Attribute.Component<'shared.department-contact', false>;
    descriptionMd: Schema.Attribute.RichText;
    design: Schema.Attribute.Component<'shared.design', false>;
    imageAccent: Schema.Attribute.Media<'images'>;
    imageLarge: Schema.Attribute.Media<'images'>;
    imageSmall: Schema.Attribute.Media<'images'>;
    tagline: Schema.Attribute.String;
    text: Schema.Attribute.Component<'elements.food-text', false>;
    title: Schema.Attribute.String;
  };
}

export interface BlockFounder extends Struct.ComponentSchema {
  collectionName: 'components_block_founders';
  info: {
    description: 'Founder introduction section';
    displayName: 'Founder';
    icon: 'user';
  };
  attributes: {
    bioMd: Schema.Attribute.RichText;
    design: Schema.Attribute.Component<'shared.design', false>;
    image: Schema.Attribute.Media<'images'>;
    label: Schema.Attribute.String;
    name: Schema.Attribute.String;
    signerName: Schema.Attribute.String;
    signerTitle: Schema.Attribute.String;
    tagline: Schema.Attribute.String;
  };
}

export interface BlockFullWidthBanner extends Struct.ComponentSchema {
  collectionName: 'components_block_full_width_banners';
  info: {
    description: 'Full-bleed banner with optional background image';
    displayName: 'Full Width Banner';
    icon: 'picture';
  };
  attributes: {
    bodyMd: Schema.Attribute.RichText;
    ctas: Schema.Attribute.Component<'shared.cta', true>;
    design: Schema.Attribute.Component<'shared.design', false>;
    heading: Schema.Attribute.String;
  };
}

export interface BlockGrowingCare extends Struct.ComponentSchema {
  collectionName: 'components_block_growing_cares';
  info: {
    description: 'GROWING CARE culture section';
    displayName: 'Growing Care';
    icon: 'seed';
  };
  attributes: {
    bodyMd: Schema.Attribute.RichText;
    design: Schema.Attribute.Component<'shared.design', false>;
    introImage: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface BlockHeroBanner extends Struct.ComponentSchema {
  collectionName: 'components_block_hero_banners';
  info: {
    description: 'Page banner, first block on most pages';
    displayName: 'Hero Banner';
    icon: 'picture';
  };
  attributes: {
    design: Schema.Attribute.Component<'shared.design', false> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface BlockHeroCarousel extends Struct.ComponentSchema {
  collectionName: 'components_block_hero_carousels';
  info: {
    description: 'Full-bleed rotating hero';
    displayName: 'Hero Carousel';
    icon: 'slideshow';
  };
  attributes: {
    design: Schema.Attribute.Component<'shared.design', false>;
    slides: Schema.Attribute.Component<'elements.hero-slide', true>;
  };
}

export interface BlockIntro extends Struct.ComponentSchema {
  collectionName: 'components_block_intros';
  info: {
    description: 'Intro section with gallery and CTAs';
    displayName: 'Intro';
    icon: 'quote';
  };
  attributes: {
    bodyMd: Schema.Attribute.RichText;
    ctas: Schema.Attribute.Component<'shared.cta', true>;
    design: Schema.Attribute.Component<'shared.design', false>;
    eyebrow: Schema.Attribute.String;
    gallery: Schema.Attribute.Media<'images', true>;
    subheading: Schema.Attribute.String;
  };
}

export interface BlockJobBoard extends Struct.ComponentSchema {
  collectionName: 'components_block_job_boards';
  info: {
    description: 'Careers listing section';
    displayName: 'Job Board';
    icon: 'briefcase';
  };
  attributes: {
    design: Schema.Attribute.Component<'shared.design', false>;
    formTitle: Schema.Attribute.String;
    jobs: Schema.Attribute.Component<'elements.job', true>;
    sectionTitle: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
    tagline: Schema.Attribute.String;
  };
}

export interface BlockJobIntro extends Struct.ComponentSchema {
  collectionName: 'components_block_job_intros';
  info: {
    description: 'Job registration intro with image gallery slider';
    displayName: 'Job Intro';
    icon: 'picture';
  };
  attributes: {
    descriptionMd: Schema.Attribute.RichText;
    design: Schema.Attribute.Component<'shared.design', false>;
    galleryTitle: Schema.Attribute.String;
    introImage: Schema.Attribute.Media<'images'>;
    slides: Schema.Attribute.Media<'images', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlockLatestArticles extends Struct.ComponentSchema {
  collectionName: 'components_block_latest_articles';
  info: {
    description: 'Heading + CTA; latest blog articles injected by the loader';
    displayName: 'Latest Articles';
    icon: 'book';
  };
  attributes: {
    articles: Schema.Attribute.Relation<'oneToMany', 'api::article.article'>;
    cta: Schema.Attribute.Component<'shared.cta', false>;
    design: Schema.Attribute.Component<'shared.design', false>;
    heading: Schema.Attribute.String;
  };
}

export interface BlockLatestNews extends Struct.ComponentSchema {
  collectionName: 'components_block_latest_news';
  info: {
    description: 'Heading + CTA; latest news article injected by the loader';
    displayName: 'Latest News';
    icon: 'bell';
  };
  attributes: {
    article: Schema.Attribute.Relation<'oneToOne', 'api::article.article'>;
    cta: Schema.Attribute.Component<'shared.cta', false>;
    design: Schema.Attribute.Component<'shared.design', false>;
    heading: Schema.Attribute.String;
  };
}

export interface BlockLegacyBanner extends Struct.ComponentSchema {
  collectionName: 'components_block_legacy_banners';
  info: {
    description: 'Full-bleed legacy statement banner';
    displayName: 'Legacy Banner';
    icon: 'picture';
  };
  attributes: {
    bodyMd: Schema.Attribute.RichText;
    design: Schema.Attribute.Component<'shared.design', false>;
    title: Schema.Attribute.String;
  };
}

export interface BlockLifeWellness extends Struct.ComponentSchema {
  collectionName: 'components_block_life_wellnesses';
  info: {
    description: 'LIFE & WELLNESS section';
    displayName: 'Life Wellness';
    icon: 'heart';
  };
  attributes: {
    bannerImage: Schema.Attribute.Media<'images'>;
    body: Schema.Attribute.Text;
    enTitle: Schema.Attribute.String;
    testimonial: Schema.Attribute.Component<'shared.testimonial', false>;
    testimonialTitle: Schema.Attribute.String;
    thTitle: Schema.Attribute.String;
  };
}

export interface BlockReasonJoin extends Struct.ComponentSchema {
  collectionName: 'components_block_reason_joins';
  info: {
    description: 'Full-width background banner with title and description';
    displayName: 'Reason Join';
    icon: 'star';
  };
  attributes: {
    descriptionMd: Schema.Attribute.RichText;
    design: Schema.Attribute.Component<'shared.design', false>;
    title: Schema.Attribute.String;
  };
}

export interface BlockRichText extends Struct.ComponentSchema {
  collectionName: 'components_block_rich_texts';
  info: {
    description: 'Standalone markdown content block';
    displayName: 'Rich Text';
    icon: 'file';
  };
  attributes: {
    contentMd: Schema.Attribute.RichText;
    design: Schema.Attribute.Component<'shared.design', false>;
  };
}

export interface BlockServiceCards extends Struct.ComponentSchema {
  collectionName: 'components_block_service_cards';
  info: {
    description: 'Grid of service cards with anchors';
    displayName: 'Service Cards';
    icon: 'apps';
  };
  attributes: {
    cards: Schema.Attribute.Component<'elements.service-card', true>;
    design: Schema.Attribute.Component<'shared.design', false>;
    sectionTitle: Schema.Attribute.String;
  };
}

export interface BlockTaglineBanner extends Struct.ComponentSchema {
  collectionName: 'components_block_tagline_banners';
  info: {
    description: 'Image banner with a quote and subtitle';
    displayName: 'Tagline Banner';
    icon: 'quote';
  };
  attributes: {
    design: Schema.Attribute.Component<'shared.design', false>;
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    quote: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
  };
}

export interface BlockTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_block_testimonials';
  info: {
    description: 'Employee testimonial section with portrait and quote';
    displayName: 'Testimonial';
    icon: 'quote';
  };
  attributes: {
    design: Schema.Attribute.Component<'shared.design', false>;
    testimonial: Schema.Attribute.Component<'shared.testimonial', false>;
    testimonialTitle: Schema.Attribute.String;
  };
}

export interface BlockTimeline extends Struct.ComponentSchema {
  collectionName: 'components_block_timelines';
  info: {
    description: 'Company history timeline';
    displayName: 'Timeline';
    icon: 'clock';
  };
  attributes: {
    design: Schema.Attribute.Component<'shared.design', false>;
    items: Schema.Attribute.Component<'elements.timeline-item', true>;
    sectionTitle: Schema.Attribute.String;
  };
}

export interface BlockVideoEmbed extends Struct.ComponentSchema {
  collectionName: 'components_block_video_embeds';
  info: {
    description: 'Embedded video from a trusted URL';
    displayName: 'Video Embed';
    icon: 'play';
  };
  attributes: {
    design: Schema.Attribute.Component<'shared.design', false>;
    videoTitle: Schema.Attribute.String;
    videoUrl: Schema.Attribute.String;
  };
}

export interface BlockVisionMission extends Struct.ComponentSchema {
  collectionName: 'components_block_vision_missions';
  info: {
    description: 'Vision, mission, quotes and core values';
    displayName: 'Vision Mission';
    icon: 'bulletList';
  };
  attributes: {
    coreValues: Schema.Attribute.Component<'elements.core-value', true>;
    design: Schema.Attribute.Component<'shared.design', false>;
    missionBodyMd: Schema.Attribute.RichText;
    missionIcon: Schema.Attribute.Media<'images'>;
    missionSubtitle: Schema.Attribute.String;
    missionTitle: Schema.Attribute.String;
    quotesImage: Schema.Attribute.Media<'images'>;
    quotesMd: Schema.Attribute.RichText;
    visionBodyMd: Schema.Attribute.RichText;
    visionIcon: Schema.Attribute.Media<'images'>;
    visionSubtitle: Schema.Attribute.String;
    visionTitle: Schema.Attribute.String;
  };
}

export interface BlockWelfare extends Struct.ComponentSchema {
  collectionName: 'components_block_welfares';
  info: {
    description: 'People / society / environment welfare section';
    displayName: 'Welfare';
    icon: 'heart';
  };
  attributes: {
    body: Schema.Attribute.Text;
    design: Schema.Attribute.Component<'shared.design', false>;
    images: Schema.Attribute.Component<'elements.welfare-image', true>;
    testimonial: Schema.Attribute.Component<'shared.testimonial', false>;
    testimonialTitle: Schema.Attribute.String;
  };
}

export interface ElementsBrandImage extends Struct.ComponentSchema {
  collectionName: 'components_elements_brand_images';
  info: {
    description: 'Image + shuffle flag inside block.brand-name';
    displayName: 'Brand Image';
    icon: 'picture';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface ElementsCheckItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_check_items';
  info: {
    description: 'Checklist row inside block.feed';
    displayName: 'Check Item';
    icon: 'check';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    text: Schema.Attribute.String;
  };
}

export interface ElementsClientLogo extends Struct.ComponentSchema {
  collectionName: 'components_elements_client_logos';
  info: {
    description: 'Logo inside block.client-logos';
    displayName: 'Client Logo';
    icon: 'picture';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String;
  };
}

export interface ElementsCoreValue extends Struct.ComponentSchema {
  collectionName: 'components_elements_core_values';
  info: {
    description: 'Icon + label inside block.vision-mission';
    displayName: 'Core Value';
    icon: 'star';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    label: Schema.Attribute.String;
  };
}

export interface ElementsExpertTeam extends Struct.ComponentSchema {
  collectionName: 'components_elements_expert_teams';
  info: {
    description: 'Team inside block.expert-teams';
    displayName: 'Expert Team';
    icon: 'user';
  };
  attributes: {
    brochure: Schema.Attribute.Media<'images' | 'files'>;
    contacts: Schema.Attribute.Component<'shared.contact-line', true>;
    name: Schema.Attribute.String;
  };
}

export interface ElementsFarmItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_farm_items';
  info: {
    description: 'Shuffle card inside block.farm';
    displayName: 'Farm Item';
    icon: 'house';
  };
  attributes: {
    descriptionMd: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images'>;
    layout: Schema.Attribute.Enumeration<['left', 'right']>;
    title: Schema.Attribute.String;
  };
}

export interface ElementsFarmStep extends Struct.ComponentSchema {
  collectionName: 'components_elements_farm_steps';
  info: {
    description: 'Numbered step card inside block.farm';
    displayName: 'Farm Step';
    icon: 'bulletList';
  };
  attributes: {
    bodyMd: Schema.Attribute.RichText;
    num: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ElementsFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_feature_items';
  info: {
    description: 'Item inside block.feature-list';
    displayName: 'Feature Item';
    icon: 'bulletList';
  };
  attributes: {
    bodyMd: Schema.Attribute.RichText;
    title: Schema.Attribute.String;
  };
}

export interface ElementsFeedHighlight extends Struct.ComponentSchema {
  collectionName: 'components_elements_feed_highlights';
  info: {
    description: 'Highlight inside block.feed';
    displayName: 'Feed Highlight';
    icon: 'landscape';
  };
  attributes: {
    body: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface ElementsFoodText extends Struct.ComponentSchema {
  collectionName: 'components_elements_food_texts';
  info: {
    description: 'Title + body text block inside block.food';
    displayName: 'Food Text';
    icon: 'file';
  };
  attributes: {
    bodyMd: Schema.Attribute.RichText;
    title: Schema.Attribute.String;
  };
}

export interface ElementsGridCard extends Struct.ComponentSchema {
  collectionName: 'components_elements_grid_cards';
  info: {
    description: 'Card inside block.card-grid';
    displayName: 'Grid Card';
    icon: 'grid';
  };
  attributes: {
    bodyMd: Schema.Attribute.RichText;
    descriptionMd: Schema.Attribute.RichText;
    imageBottom: Schema.Attribute.Boolean;
    link: Schema.Attribute.Component<'shared.link', false>;
    media: Schema.Attribute.Media<'images'>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ElementsHeroSlide extends Struct.ComponentSchema {
  collectionName: 'components_elements_hero_slides';
  info: {
    description: 'Slide inside block.hero-carousel';
    displayName: 'Hero Slide';
    icon: 'picture';
  };
  attributes: {
    caption: Schema.Attribute.String;
    media: Schema.Attribute.Media<'images' | 'videos'>;
    textColor: Schema.Attribute.Enumeration<
      ['white', 'cream', 'orange', 'navy', 'black']
    >;
  };
}

export interface ElementsInfoCard extends Struct.ComponentSchema {
  collectionName: 'components_elements_info_cards';
  info: {
    description: 'Image + title + body card used by block.farm and block.food';
    displayName: 'Info Card';
    icon: 'picture';
  };
  attributes: {
    bodyMd: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface ElementsJob extends Struct.ComponentSchema {
  collectionName: 'components_elements_jobs';
  info: {
    description: 'Job opening inside block.job-board';
    displayName: 'Job';
    icon: 'briefcase';
  };
  attributes: {
    ctaLabel: Schema.Attribute.String;
    department: Schema.Attribute.String;
    descriptionMd: Schema.Attribute.RichText;
    employmentTypeLabel: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ElementsServiceCard extends Struct.ComponentSchema {
  collectionName: 'components_elements_service_cards';
  info: {
    description: 'Card inside block.service-cards';
    displayName: 'Service Card';
    icon: 'apps';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    descriptionMd: Schema.Attribute.RichText;
    icon: Schema.Attribute.Media<'images'>;
    image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ElementsTimelineItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_timeline_items';
  info: {
    description: 'Entry inside block.timeline';
    displayName: 'Timeline Item';
    icon: 'clock';
  };
  attributes: {
    descriptionMd: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images'>;
    side: Schema.Attribute.Enumeration<['left', 'right']>;
    title: Schema.Attribute.String;
    year: Schema.Attribute.String;
  };
}

export interface ElementsValueItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_value_items';
  info: {
    description: 'Icon + title + body inside block.growing-care';
    displayName: 'Value Item';
    icon: 'heart';
  };
  attributes: {
    body: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface ElementsWelfareImage extends Struct.ComponentSchema {
  collectionName: 'components_elements_welfare_images';
  info: {
    description: 'Image + caption inside block.welfare';
    displayName: 'Welfare Image';
    icon: 'picture';
  };
  attributes: {
    caption: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface FooterLegalLink extends Struct.ComponentSchema {
  collectionName: 'components_footer_legal_links';
  info: {
    description: 'Footer legal / policy link';
    displayName: 'Legal Link';
    icon: 'file';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface FooterSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_footer_social_links';
  info: {
    description: 'Footer social media link';
    displayName: 'Social Link';
    icon: 'earth';
  };
  attributes: {
    platform: Schema.Attribute.Enumeration<['facebook', 'line', 'x']>;
    url: Schema.Attribute.String;
  };
}

export interface NavNavChild extends Struct.ComponentSchema {
  collectionName: 'components_nav_nav_children';
  info: {
    description: 'Dropdown child link under a nav item';
    displayName: 'Nav Child';
    icon: 'bulletList';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface NavNavItem extends Struct.ComponentSchema {
  collectionName: 'components_nav_nav_items';
  info: {
    description: 'Top-level nav menu item, supports one level of dropdown children';
    displayName: 'Nav Item';
    icon: 'layer';
  };
  attributes: {
    children: Schema.Attribute.Component<'nav.nav-child', true>;
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface SharedContactLine extends Struct.ComponentSchema {
  collectionName: 'components_shared_contact_lines';
  info: {
    description: 'A labelled contact value { label, value }';
    displayName: 'Contact Line';
    icon: 'phone';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface SharedCta extends Struct.ComponentSchema {
  collectionName: 'components_shared_ctas';
  info: {
    description: 'Call to action { label, url }';
    displayName: 'Cta';
    icon: 'cursor';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface SharedDepartmentContact extends Struct.ComponentSchema {
  collectionName: 'components_shared_department_contacts';
  info: {
    description: 'Contact block used by feed/farm/food blocks';
    displayName: 'Department Contact';
    icon: 'envelop';
  };
  attributes: {
    body: Schema.Attribute.RichText;
    brochure: Schema.Attribute.Media<'images'>;
    ctaLabel: Schema.Attribute.String;
    department: Schema.Attribute.String;
  };
}

export interface SharedDesign extends Struct.ComponentSchema {
  collectionName: 'components_shared_designs';
  info: {
    description: 'Presentation options shared by newer blocks';
    displayName: 'Design';
    icon: 'brush';
  };
  attributes: {
    align: Schema.Attribute.Enumeration<['left', 'center', 'right']>;
    background: Schema.Attribute.Enumeration<
      ['white', 'cream', 'orange', 'navy', 'image', 'sand']
    >;
    backgroundImage: Schema.Attribute.Media<'images'>;
    size: Schema.Attribute.Enumeration<['sm', 'md', 'lg', 'xl', 'xxl']> &
      Schema.Attribute.DefaultTo<'sm'>;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    description: 'Bare link or CTA { label?, url }';
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'SEO meta fields for page single types';
    displayName: 'Seo';
    icon: 'search';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text;
    metaTitle: Schema.Attribute.String;
    ogImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_shared_testimonials';
  info: {
    description: 'Employee / customer testimonial';
    displayName: 'Testimonial';
    icon: 'quote';
  };
  attributes: {
    author: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    quote: Schema.Attribute.RichText;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'block.brand-name': BlockBrandName;
      'block.brand-slogan': BlockBrandSlogan;
      'block.card-grid': BlockCardGrid;
      'block.channel': BlockChannel;
      'block.client-logos': BlockClientLogos;
      'block.contact-form': BlockContactForm;
      'block.expert-teams': BlockExpertTeams;
      'block.farm': BlockFarm;
      'block.feature-list': BlockFeatureList;
      'block.feed': BlockFeed;
      'block.food': BlockFood;
      'block.founder': BlockFounder;
      'block.full-width-banner': BlockFullWidthBanner;
      'block.growing-care': BlockGrowingCare;
      'block.hero-banner': BlockHeroBanner;
      'block.hero-carousel': BlockHeroCarousel;
      'block.intro': BlockIntro;
      'block.job-board': BlockJobBoard;
      'block.job-intro': BlockJobIntro;
      'block.latest-articles': BlockLatestArticles;
      'block.latest-news': BlockLatestNews;
      'block.legacy-banner': BlockLegacyBanner;
      'block.life-wellness': BlockLifeWellness;
      'block.reason-join': BlockReasonJoin;
      'block.rich-text': BlockRichText;
      'block.service-cards': BlockServiceCards;
      'block.tagline-banner': BlockTaglineBanner;
      'block.testimonial': BlockTestimonial;
      'block.timeline': BlockTimeline;
      'block.video-embed': BlockVideoEmbed;
      'block.vision-mission': BlockVisionMission;
      'block.welfare': BlockWelfare;
      'elements.brand-image': ElementsBrandImage;
      'elements.check-item': ElementsCheckItem;
      'elements.client-logo': ElementsClientLogo;
      'elements.core-value': ElementsCoreValue;
      'elements.expert-team': ElementsExpertTeam;
      'elements.farm-item': ElementsFarmItem;
      'elements.farm-step': ElementsFarmStep;
      'elements.feature-item': ElementsFeatureItem;
      'elements.feed-highlight': ElementsFeedHighlight;
      'elements.food-text': ElementsFoodText;
      'elements.grid-card': ElementsGridCard;
      'elements.hero-slide': ElementsHeroSlide;
      'elements.info-card': ElementsInfoCard;
      'elements.job': ElementsJob;
      'elements.service-card': ElementsServiceCard;
      'elements.timeline-item': ElementsTimelineItem;
      'elements.value-item': ElementsValueItem;
      'elements.welfare-image': ElementsWelfareImage;
      'footer.legal-link': FooterLegalLink;
      'footer.social-link': FooterSocialLink;
      'nav.nav-child': NavNavChild;
      'nav.nav-item': NavNavItem;
      'shared.contact-line': SharedContactLine;
      'shared.cta': SharedCta;
      'shared.department-contact': SharedDepartmentContact;
      'shared.design': SharedDesign;
      'shared.link': SharedLink;
      'shared.seo': SharedSeo;
      'shared.testimonial': SharedTestimonial;
    }
  }
}
