module.exports = ({ env }) => ({
  defaultConnection: env('DATABASE_ENV', 'development'),
  connections: {
    development: {
      connector: 'bookshelf',
      settings: {
        client: 'sqlite',
        filename: env('DATABASE_FILENAME', '.tmp/data.db'),
      },
      options: {
        useNullAsDefault: true,
      },
    },
    production: {
      connector: 'bookshelf',
      settings: {
        client: env('DATABASE_CLIENT', 'mysql'),
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'strapi'),
        username: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
      },
      options: {
      },
    },
  },
});
