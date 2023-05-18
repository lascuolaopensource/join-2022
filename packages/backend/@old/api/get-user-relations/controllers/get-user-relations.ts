"use strict";

import { types as t, Errors, endpoints as e } from "shared";
import { getUserEnrollments, entities } from "../../../utils";

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

    /**
     * Tools
     */

    tools: async (ctx: any, next: any): Promise<Array<t.ToolsBooking>> => {
        strapi.log.info("In getUserRelations/tools controller.");

        // Getting user
        const usr: t.ID<t.UsersPermissionsUser> = ctx.state.user;

        const user: t.ID<t.UsersPermissionsUser> =
            await strapi.entityService.findOne(entities.user, usr.id, {
                populate: {
                    tools_bookings: {
                        populate: {
                            slots: {
                                populate: ["tool"],
                            },
                        },
                    },
                },
                sort: {
                    tools_bookings: {
                        slots: {
                            start: "desc",
                        },
                    },
                },
            });

        const bookings = user.tools_bookings as any as Array<
            t.ID<t.ToolsBooking>
        >;

        return bookings;
    },
};
