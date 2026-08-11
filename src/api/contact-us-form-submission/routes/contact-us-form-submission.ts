import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::contact-us-form-submission.contact-us-form-submission', {
  only: ['create'],
});
