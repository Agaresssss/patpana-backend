export default {
  routes: [
    {
      method: 'POST',
      path: '/contact-us-form-submissions',
      handler: 'contact-us-form-submission.create',
      config: { auth: false },
    },
  ],
};
