module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '8980b8c6901801064b8932b22b90cdf3'),
  },
});
