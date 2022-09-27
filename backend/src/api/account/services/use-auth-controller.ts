/**
 * register-user service
 */

export default () => ({
    async register(ctx) {
        strapi.log.info("SERVICE - account/register");

        try {
            await strapi
                .controller("plugin::users-permissions.auth")
                .register(ctx);
        } catch (err) {
            throw err;
        }
    },
});
