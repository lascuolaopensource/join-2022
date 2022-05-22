"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("shared");
const utils_1 = require("../../../utils");
module.exports = {
    book: async (ctx, next) => {
        strapi.log.info("In book-tools/index controller");
        const body = ctx.request.body;
        console.log(body);
    },
    checkAvailability: async (ctx, next) => {
        strapi.log.info("In book-tools/check-availability controller");
        const body = ctx.request.body;
        let date_start = new Date();
        let date_end = shared_1.helpers.date.setHours(shared_1.helpers.date.addDays(date_start, 1), 0, 0, 0, 0);
        for (let i = 0; i < 7; i++) {
            const tool_ids = body.days[0].tool_ids;
            let slots = await getSlots(tool_ids, date_start.toISOString(), date_end.toISOString());
            slots = slots.filter((s) => {
                const hour = 1000 * 60 * 60;
                const length = (Date.parse(s.end) - Date.parse(s.start)) / hour;
                return length >= body.days[0].hours;
            });
            slots.sort((a, b) => {
                return Date.parse(a.start) - Date.parse(b.end);
            });
        }
        try {
            ctx.body = {};
        }
        catch (err) {
            ctx.body = { err };
        }
    },
};
async function getSlots(tool_ids, dateStart, dateEnd) {
    const slots = await strapi.entityService.findMany(utils_1.entities.toolSlot, {
        populate: ["tool"],
        filters: {
            $and: [
                {
                    tool: {
                        id: {
                            $in: tool_ids,
                        },
                    },
                },
                {
                    start: {
                        $gt: dateStart,
                    },
                },
                {
                    end: {
                        $lt: dateEnd,
                    },
                },
                {
                    type: {
                        $eq: shared_1.types.Enum_Toolslot_Type.Availability,
                    },
                },
            ],
        },
    });
    return slots;
}
