"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("shared");
const utils_1 = require("../../../utils");
const lodash_1 = __importDefault(require("lodash"));
module.exports = {
    book: async (ctx, next) => {
        strapi.log.info("In book-tools/index controller");
        const body = ctx.request.body;
        const user = ctx.state.user;
        const data = {
            slots: [],
            owner: user.id,
        };
        const toolsBooking = await strapi.entityService.create(utils_1.entities.toolsBooking, { data });
        const slots = [];
        for (let d of body.days) {
            for (let toolID of d.tool_ids) {
                const data = {
                    start: d.start,
                    end: d.end,
                    tool: toolID,
                    type: shared_1.types.Enum_Toolslot_Type.Booking,
                    booking: toolsBooking.id,
                };
                const toolSlot = await strapi.entityService.create(utils_1.entities.toolSlot, {
                    data,
                });
                slots.push(toolSlot.id);
                await utils_1.slots.breakAvailabilitySlot(data);
            }
        }
        const updateData = {
            slots,
        };
        await strapi.entityService.update(utils_1.entities.toolsBooking, toolsBooking.id, { data });
        try {
            ctx.body = { ok: "ok" };
        }
        catch (err) {
            ctx.body = { err };
        }
    },
    checkAvailability: async (ctx, next) => {
        strapi.log.info("In book-tools/check-availability controller");
        const body = ctx.request.body;
        let date_start = new Date();
        let date_end = shared_1.helpers.date.setHours(shared_1.helpers.date.addDays(date_start, 7), 0, 0, 0, 0);
        const INCR = 60 * 60 * 1000;
        const startDate = "2022-05-23T06:00:00Z";
        const endDate = "2022-05-29T09:00:00Z";
        const iterations = Math.abs(utils_1.date.dateDiff(startDate, endDate)) / INCR;
        const results = {};
        for (let [dayIndex, day] of Object.entries(body.days)) {
            const tool_ids = day.tool_ids;
            let slots = await getSlots(tool_ids, startDate, endDate);
            slots = slots.filter((s) => {
                const length = (Date.parse(s.end) - Date.parse(s.start)) / INCR;
                return length >= day.hours;
            });
            const groups = lodash_1.default.groupBy(slots, (s) => s.tool.id);
            const calendar = {};
            for (let i = 0; i < iterations; i++) {
                const currDate = shared_1.helpers.date.addTime(new Date(startDate), i * INCR);
                calendar[currDate.toISOString()] = {};
                for (let toolID of tool_ids) {
                    calendar[currDate.toISOString()][toolID] = false;
                }
            }
            for (let [toolID, slots] of Object.entries(groups)) {
                for (let slot of slots) {
                    const iterations = Math.abs(utils_1.date.dateDiff(slot.start, slot.end)) / INCR;
                    for (let i = 0; i < iterations; i++) {
                        const currDate = shared_1.helpers.date.addTime(new Date(slot.start), i * INCR);
                        if (calendar[currDate.toISOString()]) {
                            calendar[currDate.toISOString()][toolID] =
                                slot.type == shared_1.types.Enum_Toolslot_Type.Availability;
                        }
                    }
                }
            }
            let cursorDate = new Date(startDate);
            const cursorSize = day.hours;
            const savedCombos = [];
            for (let i = 0; i < Object.values(calendar).length - day.hours; i++) {
                const cursorDates = [];
                for (let j = 0; j < cursorSize; j++) {
                    const date = shared_1.helpers.date.addTime(cursorDate, j * INCR);
                    cursorDates.push(date);
                }
                const cursor = [];
                for (let date of cursorDates) {
                    cursor.push(calendar[date.toISOString()]);
                }
                const bools = [];
                for (let row of cursor) {
                    bools.push(...Object.values(row));
                }
                if (bools.every((b) => b)) {
                    savedCombos.push([
                        cursorDates[0],
                        shared_1.helpers.date.addTime(cursorDates[cursorDates.length - 1], INCR),
                    ]);
                    cursorDate = shared_1.helpers.date.addTime(cursorDate, INCR);
                }
                else if (bools.some((b) => b)) {
                    cursorDate = shared_1.helpers.date.addTime(cursorDate, INCR);
                }
                else {
                    cursorDate = shared_1.helpers.date.addTime(cursorDate, cursorSize * INCR);
                }
                if (Math.abs(cursorDate.getTime() - new Date(endDate).getTime()) <=
                    cursorSize * INCR) {
                    break;
                }
            }
            results[dayIndex] = savedCombos;
        }
        const resultsGrouped = {};
        for (let [day, res] of Object.entries(results)) {
            const groups = lodash_1.default.groupBy(res, (i) => {
                const dayCopy = shared_1.helpers.date.setHours(i[0], 0, 0, 0, 0);
                return dayCopy.toISOString();
            });
            resultsGrouped[day] = groups;
        }
        if (Object.keys(resultsGrouped).length == 1) {
            return { kind: shared_1.endpoints.DayResKind.Single, data: resultsGrouped["0"] };
        }
        const length = Object.keys(resultsGrouped).length;
        const savedCombos = [];
        for (let [date, options] of Object.entries(resultsGrouped["0"])) {
            let currDate = new Date(date);
            let tempCollection = [];
            for (let i = 0; i < length; i++) {
                let nextDate = shared_1.helpers.date.addDays(currDate, i);
                if (nextDate.toISOString() in resultsGrouped[i.toString()]) {
                    tempCollection.push({
                        day: i.toString(),
                        options: resultsGrouped[i.toString()][nextDate.toISOString()],
                    });
                }
                else {
                    tempCollection = [];
                    break;
                }
            }
            if (tempCollection.length == length) {
                savedCombos.push(tempCollection);
            }
        }
        return {
            kind: shared_1.endpoints.DayResKind.Multiple,
            data: savedCombos,
        };
    },
};
async function getSlots(tool_ids, dateStart, dateEnd) {
    const ANDFilterBase = [
        {
            tool: {
                id: {
                    $in: tool_ids,
                },
            },
        },
        {
            type: {
                $eq: shared_1.types.Enum_Toolslot_Type.Availability,
            },
        },
    ];
    const ANDFilterA = [
        ...ANDFilterBase,
        {
            end: {
                $lte: dateEnd,
            },
        },
        {
            end: {
                $gt: dateStart,
            },
        },
    ];
    const ANDFilterB = [
        ...ANDFilterBase,
        {
            end: {
                $gte: dateEnd,
            },
        },
        {
            start: {
                $lt: dateEnd,
            },
        },
    ];
    const slots = await strapi.entityService.findMany(utils_1.entities.toolSlot, {
        populate: ["tool"],
        filters: {
            $or: [
                {
                    $and: ANDFilterA,
                },
                {
                    $and: ANDFilterB,
                },
            ],
        },
    });
    return slots;
}
