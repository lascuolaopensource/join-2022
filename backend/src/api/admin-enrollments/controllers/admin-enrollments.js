"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils");
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
};
