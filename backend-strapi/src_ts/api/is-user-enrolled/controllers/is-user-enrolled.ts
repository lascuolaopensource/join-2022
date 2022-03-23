"use strict";

import { t, e } from "shared";
import { entities } from "../../../utils";

/**
 * A set of functions called "actions" for `is-user-enrolled`
 */

module.exports = {
    index: async (ctx: any, next: any): Promise<e.IsUserEnrolledRes> => {
        strapi.log.info("In Is-user-enrolled controller");

        // Getting course id
        const courseID: string = ctx.params["courseID"];

        // Getting user enrollments
        const user: t.ID<t.UsersPermissionsUser> = ctx.state.user;
        const userWithEnrollments: t.ID<t.UsersPermissionsUser> =
            await strapi.entityService.findOne(entities.user, user.id, {
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

        // Extracting data
        const enrollments = userWithEnrollments.enrollments as any as Array<
            t.ID<t.Enrollment>
        >;

        // Checking all user enrollments
        for (let e of enrollments) {
            const course = e.course as any as t.ID<t.Course>;

            if (course.id == courseID) {
                return { enrolled: true };
            }
        }

        return { enrolled: false };
    },
};
