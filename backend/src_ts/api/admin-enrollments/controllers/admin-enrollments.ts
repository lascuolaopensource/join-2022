"use strict";

import { types as t } from "shared";
import { entities } from "../../../utils";

/**
 * A set of functions called "actions" for `admin-enrollments`
 */

module.exports = {
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
};
