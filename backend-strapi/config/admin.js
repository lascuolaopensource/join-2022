module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'c3af1118c4a09ec54ec75917cde33e0b'),
  },
});
