"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.getCourseByID = exports.entities = void 0;
exports.entities = {
    course: "api::course.course",
    user: "plugin::users-permissions.user",
};
async function getCourseByID(id, options = {}) {
    const course = await strapi.entityService.findOne(exports.entities.course, id, options);
    return course;
}
exports.getCourseByID = getCourseByID;
async function getUserByEmail(email) {
    const user = await strapi
        .query(exports.entities.user)
        .findOne({ where: { email } });
    return user;
}
exports.getUserByEmail = getUserByEmail;
