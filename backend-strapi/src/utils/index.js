"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourseByID = void 0;
async function getCourseByID(id) {
    const course = await strapi.entityService.findOne("api::course.course", id);
    return course;
}
exports.getCourseByID = getCourseByID;
