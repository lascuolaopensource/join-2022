"use strict";

import { types as t, endpoints as e, Errors } from "shared";
import { entities, getUserInfo } from "../../../utils";
import {
    emailSender,
    AdminEnrollmentsApprovedEmailTemplateArgs,
    AdminEnrollmentsRejectedEmailTemplateArgs,
} from "../../../emails";

/**
 * A set of functions called "actions" for `admin-enrollments`
 */

module.exports = {
    /**
     *
     */

    getActiveCourses: async (ctx: any, next: any) => {
        strapi.log.info("In admin-enrollments/getActiveCourses controller");

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
        console.log(body);

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
                const newState = (body[id] as any).state;

                // Getting relations
                const user =
                    enrollment.owner as any as t.ID<t.UsersPermissionsUser>;
                const userInfo = await getUserInfo(user.id);
                const course = enrollment.course as any as t.ID<t.Course>;

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

                    // And notify the user
                    if (newState == t.Enum_Enrollment_State.Approved) {
                        emailSender.enrollmentApproved(user.email, {
                            COURSE_TITLE: course.title,
                            USER_NAME: userInfo.name as string,
                        });
                    } else if (newState == t.Enum_Enrollment_State.Rejected) {
                        emailSender.enrollmentRejected(user.email, {
                            COURSE_TITLE: course.title,
                            USER_NAME: userInfo.name as string,
                        });
                    }
                }
            }
        } catch (e) {
            console.log(e);
            return ctx.internalServerError(Errors.UnknownError);
        }

        return {};
    },
};
