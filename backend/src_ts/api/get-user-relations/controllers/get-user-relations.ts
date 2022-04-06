"use strict";

import { types as t, Errors, endpoints as e } from "shared";
import { getUserEnrollments } from "../../../utils";

/**
 * A set of functions called "actions" for `enroll`
 */

module.exports = {
    enrollments: async (
        ctx: any,
        next: any
    ): Promise<e.GetUserRelationsEnrollmentsRes> => {
        strapi.log.info("In getUserRelations/enrollments controller.");

        // Getting user
        const user: t.ID<t.UsersPermissionsUser> = ctx.state.user;

        if (!user) {
            return ctx.badRequest(Errors.UserNotFound);
        }

        // Getting user enrollments
        const enrollments: any = await getUserEnrollments(user.id);

        return { enrollments };
    },
};
