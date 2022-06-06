"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findSlotsBetween = exports.slotToInput = exports.breakAvailabilitySlot = exports.getBoundingSlot = void 0;
const shared_1 = require("shared");
const entities_1 = require("./entities");
async function getBoundingSlot(slot, type = shared_1.types.Enum_Toolslot_Type.Availability) {
    const availSlot = await strapi.entityService.findMany(entities_1.entities.toolSlot, {
        populate: ["tool"],
        filters: {
            $and: [
                {
                    start: {
                        $lte: slot.start,
                    },
                },
                {
                    end: {
                        $gte: slot.end,
                    },
                },
                {
                    tool: {
                        id: {
                            $eq: slot.tool,
                        },
                    },
                },
                {
                    type: {
                        $eq: type,
                    },
                },
            ],
        },
    });
    if (availSlot.length == 1) {
        return availSlot[0];
    }
    else {
        throw new Error("slotNotFound");
    }
}
exports.getBoundingSlot = getBoundingSlot;
async function breakAvailabilitySlot(slot) {
    let slotToBreak;
    try {
        slotToBreak = await getBoundingSlot(slot, shared_1.types.Enum_Toolslot_Type.Availability);
    }
    catch (e) {
        throw e;
    }
    if (slotToBreak.start != slot.start) {
        const beforeSlot = {
            start: slotToBreak.start,
            end: slot.start,
            type: shared_1.types.Enum_Toolslot_Type.Availability,
            tool: slot.tool,
        };
        await strapi.entityService.create(entities_1.entities.toolSlot, {
            data: beforeSlot,
        });
    }
    if (slotToBreak.end != slot.end) {
        const afterSlot = {
            start: slot.end,
            end: slotToBreak.end,
            type: shared_1.types.Enum_Toolslot_Type.Availability,
            tool: slot.tool,
        };
        await strapi.entityService.create(entities_1.entities.toolSlot, {
            data: afterSlot,
        });
    }
    await strapi.entityService.delete(entities_1.entities.toolSlot, slotToBreak.id);
}
exports.breakAvailabilitySlot = breakAvailabilitySlot;
function slotToInput(s) {
    return {
        start: s.start,
        end: s.end,
        tool: s.tool.id,
        type: s.type,
    };
}
exports.slotToInput = slotToInput;
async function findSlotsBetween(start, end, tool, type) {
    const slots = await strapi.entityService.findMany(entities_1.entities.toolSlot, {
        populate: ["tool"],
        filters: {
            $and: [
                {
                    start: {
                        $gte: start,
                    },
                },
                {
                    end: {
                        $lte: end,
                    },
                },
                {
                    tool: {
                        id: {
                            $eq: tool,
                        },
                    },
                },
                {
                    type: {
                        $eq: type,
                    },
                },
            ],
        },
    });
    return slots;
}
exports.findSlotsBetween = findSlotsBetween;
