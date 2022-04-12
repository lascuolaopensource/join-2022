"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("shared");
const utils_1 = require("../../../utils");
module.exports = {
    index: async (ctx, next) => {
        strapi.log.info("In Is-user-enrolled controller");
        const courseID = ctx.params.courseID;
        if (!courseID) {
            return ctx.badRequest(shared_1.Errors.MissingCourseID);
        }
        const user = ctx.state.user;
        const userWithEnrollments = await strapi.entityService.findOne(utils_1.entities.user, user.id, {
            populate: {
                enrollments: {
                    populate: {
                        course: {
                            fields: ["id"],
                        },
                    },
                },
            },
        });
        const enrollments = userWithEnrollments.enrollments;
        if (enrollments.length) {
            for (let e of enrollments) {
                const course = e.course;
                if (course.id == courseID) {
                    return { enrolled: true };
                }
            }
        }
        return { enrolled: false };
    },
};
