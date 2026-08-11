import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::join-us-form-submission.join-us-form-submission', {
  only: ['create'],
});
