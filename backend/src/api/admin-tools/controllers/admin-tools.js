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
            const groups = lodash_1.default.groupBy(toolUpdates, (u) => u.type);
            const updates = {};
            for (let [state, stateUpdates] of Object.entries(groups)) {
                stateUpdates.sort((a, b) => {
                    return utils_1.date.dateDiff(a.start, b.start);
                });
                const groupedUpdates = groupSlotUpdates(stateUpdates);
                const toolSlotUpdates = groupedUpdates.map((g) => mergeUpdatesGroup(g));
                updates[state] = toolSlotUpdates;
            }
            for (let updateGroup of Object.values(updates)) {
                for (let update of updateGroup) {
                    if (update.type == shared_1.types.Enum_Toolslot_Type.Availability) {
                        await strapi.entityService.create(utils_1.entities.toolSlot, {
                            data: update,
                        });
                    }
                    else {
                        await utils_1.slots.breakAvailabilitySlot(update);
                    }
                }
            }
            const startDates = toolUpdates
                .map((u) => u.start)
                .sort((a, b) => utils_1.date.dateDiff(a, b));
            const startDate = new Date(startDates[0]);
            startDate.setHours(0, 0, 0, 0);
            const beforeDate = shared_1.helpers.date.addDays(startDate, -1);
            const endDates = toolUpdates
                .map((u) => u.end)
                .sort((a, b) => utils_1.date.dateDiff(a, b));
            const endDate = new Date(endDates[endDates.length - 1]);
            endDate.setHours(0, 0, 0, 0);
            const afterDate = shared_1.helpers.date.addDays(endDate, 1);
            const availSlots = await utils_1.slots.findSlotsBetween(beforeDate.toISOString(), afterDate.toISOString(), toolID, shared_1.types.Enum_Toolslot_Type.Availability);
            const groupedSlots = groupSlotUpdates(availSlots.map((s) => utils_1.slots.slotToInput(s)));
            const mergedSlots = groupedSlots.map((g) => mergeUpdatesGroup(g));
            for (let a of availSlots) {
                await strapi.entityService.delete(utils_1.entities.toolSlot, a.id);
            }
            for (let m of mergedSlots) {
                await strapi.entityService.create(utils_1.entities.toolSlot, {
                    data: m,
                });
            }
        }
        return {};
    },
};
function groupSlotUpdates(updates) {
    checkGroupConsistency(updates);
    updates = sortToolSlotArray(updates);
    const groupedUpdates = [];
    let tempGroup = [];
    for (let i = 0; i < updates.length; i++) {
        tempGroup.push(updates[i]);
        if (i + 1 >= updates.length) {
            groupedUpdates.push(tempGroup);
            tempGroup = [];
        }
        else {
            if (updates[i].end != updates[i + 1].start) {
                groupedUpdates.push(tempGroup);
                tempGroup = [];
            }
        }
    }
    return groupedUpdates;
}
function mergeUpdatesGroup(group) {
    checkGroupConsistency(group);
    group = sortToolSlotArray(group);
    return {
        start: group[0].start,
        end: group[group.length - 1].end,
        tool: group[0].tool,
        type: group[0].type,
    };
}
function checkGroupConsistency(group) {
    const sameType = group.every((s) => s.type === group[0].type);
    const sameTool = group.every((s) => s.tool === group[0].tool);
    if (!sameTool || !sameType) {
        throw new Error("unequalUpdates");
    }
}
function sortToolSlotArray(a) {
    return a.sort((a, b) => utils_1.date.dateDiff(a.start, b.start));
}
