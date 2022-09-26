/**
 * register-user service
 */

export default () => ({
    async register(ctx) {
        try {
            await strapi
                .controller("plugin::users-permissions.auth")
                .register(ctx);
        } catch (err) {
            throw err;
        }
    },
});
