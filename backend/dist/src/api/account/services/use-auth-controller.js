"use strict";
/**
 * register-user service
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    async register(ctx) {
        try {
            await strapi
                .controller("plugin::users-permissions.auth")
                .register(ctx);
        }
        catch (err) {
            throw err;
        }
    },
});
