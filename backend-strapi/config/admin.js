module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '816e9dd79708742d3f88a24a6400bbb0'),
  },
});
