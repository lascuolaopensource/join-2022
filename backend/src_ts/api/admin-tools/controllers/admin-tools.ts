import { endpoints as e, types as t, helpers as h } from "shared";
import { entities, date, slots } from "../../../utils";
import _ from "lodash";

//

module.exports = {
    updateSlots: async (ctx: any, next: any) => {
        // Getting body
        const body = ctx.request.body as e.AdminToolsUpdateSlotsReq;

        // Iterating for each tool

        for (let [toolID, toolUpdates] of Object.entries(body)) {
            /**
             * Creating avails and breaks
             */

            // Sorting
            slots.sortSlots(toolUpdates);

            // Dividing the two types of updates
            let blocks = toolUpdates.filter((u) => u.type === null);
            let availabilities = toolUpdates.filter(
                (u) => u.type == t.Enum_Toolslot_Type.Availability
            );

            // Merging the slots
            blocks = slots.groupMergeSlots(blocks);
            availabilities = slots.groupMergeSlots(availabilities);

            // Creating blocks
            for (let b of blocks) {
                try {
                    const bounding = await slots.getBoundingSlot(b);
                    await slots.breakAvailabilitySlot(bounding, b);
                } catch (e) {
                    console.log(e);
                }
            }

            // Creating availabilities
            for (let a of availabilities) {
                await strapi.entityService.create(entities.toolSlot, {
                    data: a,
                });
            }

            /**
             * Merging the availability slots
             */

            // Getting one day before edits
            const firstDate = slots.getFirstDate(toolUpdates);
            const beforeDate = h.date.addDays(firstDate, -1);

            // Getting one day after edits
            const lastDate = slots.getLastDate(toolUpdates);
            const afterDate = h.date.addDays(lastDate, 1);

            // Getting all the slots between the dates
            const availSlots = await slots.findSlotsBetween(
                beforeDate.toISOString(),
                afterDate.toISOString(),
                toolID,
                t.Enum_Toolslot_Type.Availability
            );

            // Grouping+Merging slots
            const newSlots = slots.groupMergeSlots(
                availSlots.map((s) => slots.slotToInput(s))
            );

            // Deleting the found slots
            for (let a of availSlots) {
                await strapi.entityService.delete(entities.toolSlot, a.id);
            }

            // Creating new slots
            for (let m of newSlots) {
                await strapi.entityService.create(entities.toolSlot, {
                    data: m,
                });
            }
        }

        return {};
    },
};
