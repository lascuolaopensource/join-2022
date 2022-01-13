module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '054ff26b5c1a9cb8f92ae746bacff94f'),
  },
});
