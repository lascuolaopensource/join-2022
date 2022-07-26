"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("shared");
const utils_1 = require("../../../utils");
const lodash_1 = __importDefault(require("lodash"));
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
            const bounds = utils_1.slots.getSlotsBounds(toolUpdates);
            await utils_1.slots.slotsCleanup(toolID, bounds.start, bounds.end);
        }
        return {};
    },
    deleteBooking: async (ctx, next) => {
        strapi.log.info("In admin-tools/deleteBooking controller");
        const id = ctx.params.id;
        const booking = await strapi.entityService.findOne(utils_1.entities.toolsBooking, id, {
            populate: {
                slots: {
                    populate: ["tool"],
                },
            },
        });
        console.log(booking);
        await strapi.entityService.delete(utils_1.entities.toolsBooking, booking.id);
        const bookingSlots = booking.slots;
        let toolIDs = bookingSlots.map((s) => {
            const tool = s.tool;
            return tool.id;
        });
        toolIDs = lodash_1.default.uniq(toolIDs);
        for (let s of bookingSlots) {
            await strapi.entityService.update(utils_1.entities.toolSlot, s.id, {
                data: {
                    type: shared_1.types.Enum_Toolslot_Type.Availability,
                },
            });
        }
        const bounds = utils_1.slots.getSlotsBounds(bookingSlots);
        for (let toolID of toolIDs) {
            await utils_1.slots.slotsCleanup(toolID, bounds.start, bounds.end);
        }
        return {};
    },
};
