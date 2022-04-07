"use strict";

import { types as t, Errors, endpoints as e } from "shared";
import { getUserEnrollments } from "../../../utils";

/**
 * A set of functions called "actions" for `enroll`
 */

module.exports = {
    /**
     * Enrollments
     */

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

    /**
     * Role
     */

    role: async (ctx: any, next: any): Promise<e.GetUserRelationsRoleRes> => {
        strapi.log.info("In getUserRelations/role controller.");

        // Getting user
        const user: t.ID<t.UsersPermissionsUser> = ctx.state.user;

        if (!user.role) {
            return ctx.notFound(Errors.NotFound);
        }

        const role = user.role as t.ID<t.UsersPermissionsRole>;

        return { role: role.type as t.UserPermissionRoles };
    },
};
