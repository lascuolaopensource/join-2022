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

            const bounds = slots.getSlotsBounds(toolUpdates);
            await slots.slotsCleanup(toolID, bounds.start, bounds.end);
        }

        return {};
    },

    /**
     *
     */

    deleteBooking: async (ctx: any, next: any) => {
        strapi.log.info("In admin-tools/deleteBooking controller");

        // Getting booking id
        const id: string = ctx.params.id;

        // ** Booking ** //

        // Getting booking
        const booking: t.ID<t.ToolsBooking> =
            await strapi.entityService.findOne(entities.toolsBooking, id, {
                populate: {
                    slots: {
                        populate: ["tool"],
                    },
                },
            });

        console.log(booking);

        // Deleting booking
        await strapi.entityService.delete(entities.toolsBooking, booking.id);

        // ** Slots ** //

        // Getting slots
        const bookingSlots = booking.slots as any as Array<t.ID<t.ToolSlot>>;

        // Getting tools ids
        let toolIDs: Array<string> = bookingSlots.map((s) => {
            const tool = s.tool as any as t.ID<t.Tool>;
            return tool.id;
        });

        toolIDs = _.uniq(toolIDs);

        // Converting slots to availability
        for (let s of bookingSlots) {
            await strapi.entityService.update(entities.toolSlot, s.id, {
                data: {
                    type: t.Enum_Toolslot_Type.Availability,
                },
            });
        }

        // Doing cleanup
        const bounds = slots.getSlotsBounds(bookingSlots);
        for (let toolID of toolIDs) {
            await slots.slotsCleanup(toolID, bounds.start, bounds.end);
        }

        return {};
    },
};
