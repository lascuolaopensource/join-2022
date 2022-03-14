"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourseByID = void 0;
async function getCourseByID(id, options = {}) {
    const course = await strapi.entityService.findOne("api::course.course", id, options);
    return course;
}
exports.getCourseByID = getCourseByID;
