"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findSlotsBetween = exports.getLastDate = exports.getFirstDate = exports.slotToInput = exports.breakAvailabilitySlot = exports.getBoundingSlot = exports.groupMergeSlots = exports.mergeSlotsGroup = exports.groupSlots = exports.checkSlotsConsistency = exports.sortSlots = exports.slotToInterval = exports.Interval = void 0;
const shared_1 = require("shared");
const entities_1 = require("./entities");
const date_1 = require("./date");
class Interval {
    constructor(start, end) {
        if (end < start)
            throw new Error("InvalidIntervalData");
        this.start = start;
        this.end = end;
    }
    length() {
        return this.end - this.start;
    }
    overlaps(i) {
        return !(i.end <= this.start || i.start >= this.end);
    }
    includes(i) {
        return this.start <= i.start && this.end >= i.end;
    }
    equals(i) {
        return this.start == i.start && this.end == i.end;
    }
    subtract(i) {
        if (!this.overlaps(i))
            throw new Error("IntervalsNotOverlapping");
        if (i.includes(this) && !this.equals(i))
            throw new Error("IntervalBiggerThanBase");
        const leftovers = [];
        if (this.equals(i))
            return leftovers;
        if (this.end > i.end)
            leftovers.push(new Interval(i.end, this.end));
        if (this.start < i.start)
            leftovers.push(new Interval(this.start, i.start));
        return leftovers;
    }
}
exports.Interval = Interval;
function slotToInterval(s) {
    const start = Date.parse(s.start);
    const end = Date.parse(s.end);
    return new Interval(start, end);
}
exports.slotToInterval = slotToInterval;
function sortSlots(a) {
    return a.sort((a, b) => (0, date_1.dateDiff)(a.start, b.start));
}
exports.sortSlots = sortSlots;
function checkSlotsConsistency(group) {
    const sameType = group.every((s) => s.type === group[0].type);
    const sameTool = group.every((s) => s.tool === group[0].tool);
    if (!sameTool || !sameType) {
        throw new Error("unequalUpdates");
    }
    return sameTool && sameType;
}
exports.checkSlotsConsistency = checkSlotsConsistency;
function groupSlots(a) {
    checkSlotsConsistency(a);
    sortSlots(a);
    const groupedSlots = [];
    let tempGroup = [];
    for (let i = 0; i < a.length; i++) {
        tempGroup.push(a[i]);
        if (i + 1 == a.length) {
            groupedSlots.push(tempGroup);
            tempGroup = [];
        }
        else {
            if (a[i].end != a[i + 1].start) {
                groupedSlots.push(tempGroup);
                tempGroup = [];
            }
        }
    }
    return groupedSlots;
}
exports.groupSlots = groupSlots;
function mergeSlotsGroup(group) {
    checkSlotsConsistency(group);
    sortSlots(group);
    return {
        start: group[0].start,
        end: group[group.length - 1].end,
        tool: group[0].tool,
        type: group[0].type,
    };
}
exports.mergeSlotsGroup = mergeSlotsGroup;
function groupMergeSlots(a) {
    const groups = groupSlots(a);
    const merges = groups.map((g) => mergeSlotsGroup(g));
    return merges;
}
exports.groupMergeSlots = groupMergeSlots;
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
async function breakAvailabilitySlot(boundingSlot, breakingSlot) {
    const boundInt = slotToInterval(boundingSlot);
    const breakInt = slotToInterval(breakingSlot);
    try {
        const leftovers = boundInt.subtract(breakInt);
        for (let l of leftovers) {
            const data = {
                start: new Date(l.start),
                end: new Date(l.end),
                type: shared_1.types.Enum_Toolslot_Type.Availability,
                tool: breakingSlot.tool,
            };
            await strapi.entityService.create(entities_1.entities.toolSlot, { data });
        }
        await strapi.entityService.delete(entities_1.entities.toolSlot, boundingSlot.id);
    }
    catch (e) {
        console.log(e);
    }
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
function getFirstDate(a) {
    const startDates = a.map((s) => s.start).sort((a, b) => (0, date_1.dateDiff)(a, b));
    return new Date(startDates[0]);
}
exports.getFirstDate = getFirstDate;
function getLastDate(a) {
    const endDates = a.map((s) => s.end).sort((a, b) => (0, date_1.dateDiff)(a, b));
    return new Date(endDates[endDates.length - 1]);
}
exports.getLastDate = getLastDate;
async function findSlotsBetween(start, end, tool, type) {
    const slots = await strapi.entityService.findMany(entities_1.entities.toolSlot, {
        populate: ["tool"],
        filters: {
            $and: [
                { start: { $lt: end } },
                { end: { $gt: start } },
                { tool: { id: { $eq: tool } } },
                { type: { $eq: type } },
            ],
        },
    });
    return slots;
}
exports.findSlotsBetween = findSlotsBetween;
