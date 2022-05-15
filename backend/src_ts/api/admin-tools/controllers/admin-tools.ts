import { endpoints as e, types as t, helpers as h } from "shared";
import { entities } from "../../../utils";

module.exports = {
    updateSlots: async (ctx: any, next: any) => {
        strapi.log.info("In admin-tools/updateSlots controller");

        // Getting body
        const { changes } = ctx.request.body as e.AdminToolsUpdateSlotsReq;

        changes.forEach(async (c) => {
            // Getting time data
            const date: Date = new Date(Date.parse(c.dateTime));
            const dateStr: string = h.date.formatQueryDate(date);
            const time_start = h.date.getTimeString(date);
            date.setHours(date.getHours() + 1);
            const time_end = h.date.getTimeString(date);

            // Removing slot if state === null
            if (c.state === null) {
                // Finding matching slot
                const slots: Array<t.ID<t.ToolSlot>> =
                    await strapi.entityService.findMany(entities.toolSlot, {
                        filters: {
                            date: dateStr,
                            time_start,
                            time_end,
                        },
                    });
                slots.forEach(async (s) => {
                    await strapi.entityService.delete(entities.toolSlot, s.id);
                });
            }
            // Otherwise creating slot
            else if ((c.state = t.Enum_Toolslot_Type.Block)) {
                // Creating slot
                const data: t.ToolSlotInput = {
                    date: dateStr,
                    time_start,
                    time_end,
                    type: t.Enum_Toolslot_Type.Block,
                    tool: c.toolID,
                };
                try {
                    const slot: t.ID<t.ToolSlot> =
                        await strapi.entityService.create(entities.toolSlot, {
                            data,
                        });
                } catch (e) {
                    console.log(e);
                }
            }
        });

        return {};
    },
};
