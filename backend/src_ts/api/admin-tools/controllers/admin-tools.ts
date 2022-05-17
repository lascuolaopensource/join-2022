import { endpoints as e, types as t, helpers as h } from "shared";
import { entities } from "../../../utils";

module.exports = {
    updateSlots: async (ctx: any, next: any) => {
        strapi.log.info("In admin-tools/updateSlots controller");

        // Getting body
        const { changes } = ctx.request.body as e.AdminToolsUpdateSlotsReq;

        for (let c of changes) {
            const start = c.dateTime;
            const startDate = new Date(Date.parse(start));
            const endDate = h.date.addHours(startDate, 1);
            const end = endDate.toISOString();
            console.log(start, end);

            // Removing slot if state === null
            if (c.state === null) {
                // Finding matching slot
                const slots: Array<t.ID<t.ToolSlot>> =
                    await strapi.entityService.findMany(entities.toolSlot, {
                        filters: {
                            start,
                            end,
                        },
                    });
                for (let s of slots) {
                    await strapi.entityService.delete(entities.toolSlot, s.id);
                }
            }
            // Otherwise creating slot
            else if ((c.state = t.Enum_Toolslot_Type.Block)) {
                // Creating slot
                const data: t.ToolSlotInput = {
                    start,
                    end,
                    type: t.Enum_Toolslot_Type.Block,
                    tool: c.toolID,
                };
                const slot: t.ID<t.ToolSlot> =
                    await strapi.entityService.create(entities.toolSlot, {
                        data,
                    });
            }
        }

        return {};
    },
};
