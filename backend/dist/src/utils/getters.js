"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = void 0;
const entities_1 = require("./entities");
async function getUserByEmail(email) {
    const user = await strapi.entityService.findMany(entities_1.entities.user, {
        filters: {
            email,
        },
    });
    return user;
}
exports.getUserByEmail = getUserByEmail;
