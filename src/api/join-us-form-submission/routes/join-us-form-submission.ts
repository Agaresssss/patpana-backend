export default {
  routes: [
    {
      method: 'POST',
      path: '/join-us-form-submissions',
      handler: 'join-us-form-submission.create',
      config: { auth: false },
    },
  ],
};
