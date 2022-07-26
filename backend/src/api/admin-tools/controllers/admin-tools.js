"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("shared");
const utils_1 = require("../../../utils");
module.exports = {
    updateSlots: async (ctx, next) => {
        const body = ctx.request.body;
        for (let [toolID, toolUpdates] of Object.entries(body)) {
            utils_1.slots.sortSlots(toolUpdates);
            let blocks = toolUpdates.filter((u) => u.type === null);
            let availabilities = toolUpdates.filter((u) => u.type == shared_1.types.Enum_Toolslot_Type.Availability);
            blocks = utils_1.slots.groupMergeSlots(blocks);
            availabilities = utils_1.slots.groupMergeSlots(availabilities);
            for (let b of blocks) {
                try {
                    const bounding = await utils_1.slots.getBoundingSlot(b);
                    await utils_1.slots.breakAvailabilitySlot(bounding, b);
                }
                catch (e) {
                    console.log(e);
                }
            }
            for (let a of availabilities) {
                await strapi.entityService.create(utils_1.entities.toolSlot, {
                    data: a,
                });
            }
            const firstDate = utils_1.slots.getFirstDate(toolUpdates);
            const beforeDate = shared_1.helpers.date.addDays(firstDate, -1);
            const lastDate = utils_1.slots.getLastDate(toolUpdates);
            const afterDate = shared_1.helpers.date.addDays(lastDate, 1);
            const availSlots = await utils_1.slots.findSlotsBetween(beforeDate.toISOString(), afterDate.toISOString(), [toolID], shared_1.types.Enum_Toolslot_Type.Availability);
            const newSlots = utils_1.slots.groupMergeSlots(availSlots.map((s) => utils_1.slots.slotToInput(s)));
            for (let a of availSlots) {
                await strapi.entityService.delete(utils_1.entities.toolSlot, a.id);
            }
            for (let m of newSlots) {
                await strapi.entityService.create(utils_1.entities.toolSlot, {
                    data: m,
                });
            }
        }
        return {};
    },
    deleteBooking: async (ctx, next) => {
        const id = ctx.params.id;
        console.log(id);
        return {};
    },
};
