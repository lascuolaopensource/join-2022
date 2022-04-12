"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("shared");
const utils_1 = require("../../../utils");
const emails_1 = require("../../../emails");
module.exports = {
    getActiveCourses: async (ctx, next) => {
        strapi.log.info("In admin-enrollments/getActiveCourses controller");
        const today = new Date().toISOString();
        const courses = await strapi.entityService.findMany(utils_1.entities.course, {
            populate: ["enrollments", "meetings"],
            filters: {
                meetings: {
                    date: {
                        $gt: today,
                    },
                },
            },
        });
        return { courses };
    },
    update: async (ctx, next) => {
        strapi.log.info("In admin-enrollments/update controller");
        const body = ctx.request.body;
        console.log(body);
        try {
            for (let id of Object.keys(body)) {
                const enrollment = await strapi.entityService.findOne(utils_1.entities.enrollment, id, {
                    populate: ["owner", "course"],
                });
                const oldState = enrollment.state;
                const newState = body[id].state;
                const user = enrollment.owner;
                const userInfo = await (0, utils_1.getUserInfo)(user.id);
                const course = enrollment.course;
                if (oldState != newState) {
                    await strapi.entityService.update(utils_1.entities.enrollment, id, {
                        data: {
                            state: newState,
                        },
                    });
                    strapi.log.info(`Updated enrollment ${id}: ${oldState} -> ${newState}`);
                    if (newState == shared_1.types.Enum_Enrollment_State.Approved) {
                        emails_1.emailSender.enrollmentApproved(user.email, {
                            COURSE_TITLE: course.title,
                            USER_NAME: userInfo.name,
                        });
                    }
                    else if (newState == shared_1.types.Enum_Enrollment_State.Rejected) {
                        emails_1.emailSender.enrollmentRejected(user.email, {
                            COURSE_TITLE: course.title,
                            USER_NAME: userInfo.name,
                        });
                    }
                }
            }
        }
        catch (e) {
            console.log(e);
            return ctx.internalServerError(shared_1.Errors.UnknownError);
        }
        return {};
    },
};
