import { endpoints as e, types as t, helpers as h } from "shared";
import { entities } from "../../../utils";

module.exports = {
    updateSlots: async (ctx: any, next: any) => {
        strapi.log.info("In admin-tools/updateSlots controller");

        // Getting body
        const { changes } = ctx.request.body as e.AdminToolsUpdateSlotsReq;

        changes.forEach(async (c) => {
            // const date = h.date.formatQueryDate(
            //     new Date(Date.parse(c.dateTime))
            // );
            // const time =
            // console.log(date);
            // const slot: t.ID<t.ToolSlot> = await strapi.entityService.findMany(
            //     entities.toolSlot,
            //     {}
            // );
            // Controllare se esiste slot con tale configurazione
            // Applicare cambiamento
        });

        return {};
    },
};
