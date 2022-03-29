module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '1011a1e9e20bbda7535f991d8d7b28c2'),
  },
});
