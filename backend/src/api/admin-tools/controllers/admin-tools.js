"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("shared");
const utils_1 = require("../../../utils");
module.exports = {
    updateSlots: async (ctx, next) => {
        strapi.log.info("In admin-tools/updateSlots controller");
        const { changes } = ctx.request.body;
        changes.forEach(async (c) => {
            const date = new Date(Date.parse(c.dateTime));
            const dateStr = shared_1.helpers.date.formatQueryDate(date);
            const time_start = shared_1.helpers.date.getTimeString(date);
            date.setHours(date.getHours() + 1);
            const time_end = shared_1.helpers.date.getTimeString(date);
            if (c.state === null) {
                const slots = await strapi.entityService.findMany(utils_1.entities.toolSlot, {
                    filters: {
                        date: dateStr,
                        time_start,
                        time_end,
                    },
                });
                slots.forEach(async (s) => {
                    await strapi.entityService.delete(utils_1.entities.toolSlot, s.id);
                });
            }
            else if ((c.state = shared_1.types.Enum_Toolslot_Type.Block)) {
                const data = {
                    date: dateStr,
                    time_start,
                    time_end,
                    type: shared_1.types.Enum_Toolslot_Type.Block,
                    tool: c.toolID,
                };
                const slot = await strapi.entityService.create(utils_1.entities.toolSlot, {
                    data,
                });
            }
        });
        return {};
    },
};
