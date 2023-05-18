"use strict";

import { types as t, routes as r, errors } from "join-shared";
import { CTX, entities } from "../../../utils";
// import { entities, getUserInfo, getCourseByID } from "../../../utils";
// import { emailSender } from "../../../emails";

/**
 * A set of functions called "actions" for `admin-enrollments`
 */

export default {
    /**
     * Updates the enrollments
     */

    update: async (
        ctx: CTX<r.Admin.Enrollments.Update.Req>,
        next: any
    ): Promise<r.Admin.Enrollments.Update.Res> => {
        strapi.log.info("CONTROLLER - admin-enrollments/update");

        for (let i of ctx.request.body.items) {
            // Getting enrollment
            const enrollment: t.ID<t.Enrollment> =
                await strapi.entityService.findOne(entities.enrollment, i.id);

            if (!enrollment) continue;

            // States
            const oldState = enrollment.state;
            const newState = i.state;

            // If the state has not changed we skip it
            if (oldState == newState) continue;

            // Otherwise we update it
            await strapi.entityService.update(entities.enrollment, i.id, {
                data: { state: newState },
            });
            strapi.log.info(
                `Updated enrollment ${i.id}: ${oldState} -> ${newState}`
            );
        }

        return {};
    },

    /**
     * Confirms course and notifies the users
     */

    confirmCourse: async (
        ctx: CTX<{}, r.Admin.Enrollments.ConfirmCourse.Params>,
        next: any
    ) => {
        strapi.log.info("CONTROLLER - admin-enrollments/confirmCourse");

        const courseID = ctx.params.id;

        // Getting course and its enrollments, with owner data
        const course = await strapi.entityService.findOne(
            entities.course,
            courseID,
            {
                populate: {
                    enrollments: {
                        populate: {
                            owner: {
                                populate: ["info"],
                            },
                        },
                    },
                },
            }
        );

        console.log(course);

        // // If course is already confirmed, we get out
        // if (course.confirmed) return {};

        // // Confirming course
        // await strapi.entityService.update(entities.course, courseID, {
        //     data: {
        //         confirmed: true,
        //     },
        // });

        // // Getting enrollments
        // const enrollments = course.enrollments as any as Array<
        //     t.ID<t.Enrollment>
        // >;

        // // Sending emails
        // for (let e of enrollments) {
        //     const owner = e.owner as t.ID<t.UsersPermissionsUser>;
        //     const ownerInfo = owner.userInfo as t.ID<t.UserInfo>;

        //     // Approved email
        //     if (e.state == t.Enum_Enrollment_State.Approved) {
        //         emailSender.enrollmentApproved(owner.email, {
        //             COURSE_TITLE: course.title,
        //             USER_NAME: ownerInfo.name as string,
        //         });
        //     }
        //     // Rejected email
        //     else if (e.state == t.Enum_Enrollment_State.Rejected) {
        //         emailSender.enrollmentRejected(owner.email, {
        //             COURSE_TITLE: course.title,
        //             USER_NAME: ownerInfo.name as string,
        //         });
        //     }
        // }

        return {};
    },
};

/* Backup */
