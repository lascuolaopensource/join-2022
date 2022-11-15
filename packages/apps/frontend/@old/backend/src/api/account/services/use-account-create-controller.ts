/**
 * register-user service
 */

export default () => ({
    async register(ctx) {
        strapi.log.info("SERVICE - account/create");

        try {
            await strapi.controller("api::account.account").create(ctx);
        } catch (err) {
            throw err;
        }
    },
});
