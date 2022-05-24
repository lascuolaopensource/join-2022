"use strict";

import { types as t, endpoints as e, Errors } from "shared";
import { entities, getUserInfo, getCourseByID } from "../../../utils";
import { emailSender } from "../../../emails";

/**
 * A set of functions called "actions" for `admin-enrollments`
 */

module.exports = {
    /**
     *
     */

    getUpcomingCourses: async (ctx: any, next: any) => {
        strapi.log.info("In admin-enrollments/getUpcomingCourses controller");

        // Getting courses not started
        const today = new Date().toISOString();

        const courses: Array<t.Course> = await strapi.entityService.findMany(
            entities.course,
            {
                populate: ["enrollments", "meetings"],
                filters: {
                    meetings: {
                        date: {
                            $gt: today,
                        },
                    },
                },
            }
        );

        return { courses };
    },

    /**
     * Updates the enrollments
     */

    update: async (ctx: any, next: any) => {
        strapi.log.info("In admin-enrollments/update controller");

        const body: e.AdminEnrollmentsUpdateReq = ctx.request.body;

        try {
            for (let id of Object.keys(body)) {
                // Getting enrollment
                const enrollment: t.ID<t.Enrollment> =
                    await strapi.entityService.findOne(
                        entities.enrollment,
                        id,
                        {
                            populate: ["owner", "course"],
                        }
                    );

                // Getting states
                const oldState = enrollment.state;
                const newState = body[id].state;

                // If the state has changed
                if (oldState != newState) {
                    // We update it
                    await strapi.entityService.update(entities.enrollment, id, {
                        data: {
                            state: newState,
                        },
                    });
                    strapi.log.info(
                        `Updated enrollment ${id}: ${oldState} -> ${newState}`
                    );
                }
            }
        } catch (e) {
            console.log(e);
            return ctx.internalServerError(Errors.UnknownError);
        }

        return {};
    },

    /**
     * Notifies users
     */

    notify: async (ctx: any, next: any) => {
        strapi.log.info("In admin-enrollments/notify controller");

        const course = await getCourseByID(ctx.params.courseID, {
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

        const enrollments = course.enrollments as any as Array<
            t.ID<t.Enrollment>
        >;

        for (let e of enrollments) {
            const owner = e.owner as t.ID<t.UsersPermissionsUser>;
            const ownerInfo = owner.userInfo as t.ID<t.UserInfo>;

            if (e.state == t.Enum_Enrollment_State.Approved) {
                emailSender.enrollmentApproved(owner.email, {
                    COURSE_TITLE: course.title,
                    USER_NAME: ownerInfo.name as string,
                });
            } else if (e.state == t.Enum_Enrollment_State.Rejected) {
                emailSender.enrollmentRejected(owner.email, {
                    COURSE_TITLE: course.title,
                    USER_NAME: ownerInfo.name as string,
                });
            }
        }

        return { ok: true };
    },
};
