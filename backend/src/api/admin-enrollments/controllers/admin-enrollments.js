"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("shared");
const utils_1 = require("../../../utils");
const emails_1 = require("../../../emails");
module.exports = {
    getUpcomingCourses: async (ctx, next) => {
        strapi.log.info("In admin-enrollments/getUpcomingCourses controller");
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
        try {
            for (let e of body) {
                if (e.id && e.attributes) {
                    const enrollment = await strapi.entityService.findOne(utils_1.entities.enrollment, e.id, {
                        populate: ["owner", "course"],
                    });
                    const oldState = enrollment.state;
                    const newState = e.attributes.state;
                    if (oldState != newState) {
                        await strapi.entityService.update(utils_1.entities.enrollment, e.id, { data: { state: newState } });
                        strapi.log.info(`Updated enrollment ${e.id}: ${oldState} -> ${newState}`);
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
    closeCourse: async (ctx, next) => {
        strapi.log.info("In admin-enrollments/closeCourse controller");
        const courseID = ctx.params.courseID;
        const course = await (0, utils_1.getCourseByID)(courseID, {
            populate: {
                enrollments: {
                    populate: {
                        owner: {
                            populate: ["userInfo"],
                        },
                    },
                },
            },
        });
        if (course.confirmed)
            return {};
        await strapi.entityService.update(utils_1.entities.course, courseID, {
            data: {
                confirmed: true,
            },
        });
        const enrollments = course.enrollments;
        for (let e of enrollments) {
            const owner = e.owner;
            const ownerInfo = owner.userInfo;
            if (e.state == shared_1.types.Enum_Enrollment_State.Approved) {
                emails_1.emailSender.enrollmentApproved(owner.email, {
                    COURSE_TITLE: course.title,
                    USER_NAME: ownerInfo.name,
                });
            }
            else if (e.state == shared_1.types.Enum_Enrollment_State.Rejected) {
                emails_1.emailSender.enrollmentRejected(owner.email, {
                    COURSE_TITLE: course.title,
                    USER_NAME: ownerInfo.name,
                });
            }
        }
        return {};
    },
};
