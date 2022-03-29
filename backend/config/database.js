const path = require("path");

function connectionDev(env) {
    return {
        client: "sqlite",
        connection: {
            filename: path.join(
                __dirname,
                "..",
                env("DATABASE_FILENAME", "database/data.db")
            ),
        },
        useNullAsDefault: true,
    };
}

function connectionProd(env) {
    return {
        client: "mysql",
        connection: {
            host: env("DATABASE_HOST", "127.0.0.1"),
            port: env.int("DATABASE_PORT", 3306),
            database: env("DATABASE_NAME", "strapi"),
            user: env("DATABASE_USERNAME", "strapi"),
            password: env("DATABASE_PASSWORD", "strapi"),
            ssl: false,
        },
        debug: false,
    };
}

module.exports = ({ env }) => ({
    connection:
        env("DATABASE_ENV", "development") == "production"
            ? connectionProd(env)
            : connectionDev(env),
});
