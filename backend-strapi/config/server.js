module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  url: env('BACKEND_URL', 'http://localhost:1337'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'd22cbbeecb70d3783f7487b1a17ce844'),
    },
  },
});