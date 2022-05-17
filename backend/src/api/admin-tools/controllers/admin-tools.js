"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("shared");
const utils_1 = require("../../../utils");
module.exports = {
    updateSlots: async (ctx, next) => {
        strapi.log.info("In admin-tools/updateSlots controller");
        const { changes } = ctx.request.body;
        for (let c of changes) {
            const start = c.dateTime;
            const startDate = new Date(Date.parse(start));
            const endDate = shared_1.helpers.date.addHours(startDate, 1);
            const end = endDate.toISOString();
            console.log(start, end);
            if (c.state === null) {
                const slots = await strapi.entityService.findMany(utils_1.entities.toolSlot, {
                    filters: {
                        start,
                        end,
                    },
                });
                for (let s of slots) {
                    await strapi.entityService.delete(utils_1.entities.toolSlot, s.id);
                }
            }
            else if ((c.state = shared_1.types.Enum_Toolslot_Type.Block)) {
                const data = {
                    start,
                    end,
                    type: shared_1.types.Enum_Toolslot_Type.Block,
                    tool: c.toolID,
                };
                const slot = await strapi.entityService.create(utils_1.entities.toolSlot, {
                    data,
                });
            }
        }
        return {};
    },
};
