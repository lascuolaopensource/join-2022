"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.getCourseByID = void 0;
async function getCourseByID(id, options = {}) {
    const course = await strapi.entityService.findOne("api::course.course", id, options);
    return course;
}
exports.getCourseByID = getCourseByID;
async function getUserByEmail(email) {
    const user = await strapi
        .query("plugin::users-permissions.user")
        .findOne({ where: { email } });
    return user;
}
exports.getUserByEmail = getUserByEmail;
