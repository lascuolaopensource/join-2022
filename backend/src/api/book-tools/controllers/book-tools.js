"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("shared");
const utils_1 = require("../../../utils");
const lodash_1 = __importDefault(require("lodash"));
const TIMESTEP = 60 * 60 * 1000;
module.exports = {
    book: async (ctx, next) => {
        strapi.log.info("In book-tools/index controller");
    },
    checkAvailability: async (ctx, next) => {
        strapi.log.info("In book-tools/check-availability controller");
        const body = ctx.request.body;
        console.log(body);
        let date_start = new Date(Date.parse(body.start));
        date_start.setHours(0, 0, 0, 0);
        date_start = shared_1.helpers.date.addDays(date_start, 1);
        const date_end = shared_1.helpers.date.addDays(date_start, 7);
        const daysResults = [];
        for (let day of body.days) {
            let slots = await utils_1.slots.findSlotsBetween(date_start.toISOString(), date_end.toISOString(), day.tools, shared_1.types.Enum_Toolslot_Type.Availability);
            slots = slots.filter((slot) => {
                const length = (Date.parse(slot.end) - Date.parse(slot.start)) / TIMESTEP;
                return length >= day.hours;
            });
            const areSlotsValid = slots.every((slot) => {
                return utils_1.slots.slotToInterval(slot).isMultipleofLength(TIMESTEP);
            });
            if (!areSlotsValid) {
                throw new Error("InvalidSlotsLength");
            }
            const cal = new utils_1.slots.AligmentCalendar(date_start, date_end, TIMESTEP);
            const ints = slots.map((slot) => utils_1.slots.slotToDateInterval(slot));
            cal.addIntervals(ints);
            daysResults.push(cal.checkAlignments(day.tools.length, day.hours));
        }
        if (body.days.length == 1) {
            return {
                kind: shared_1.endpoints.DayResKind.Single,
                data: daysResults[0].map((i) => [i.startISO, i.endISO]),
            };
        }
        const daysGrouped = [];
        for (let dayResult of daysResults) {
            const groups = lodash_1.default.groupBy(dayResult, (i) => shared_1.helpers.date.setHours(i.start, 0, 0, 0, 0).toISOString());
            daysGrouped.push(groups);
        }
        const sequences = [];
        for (let startStr in daysGrouped[0]) {
            const start = new Date(startStr);
            let prev = start;
            const seq = [start];
            for (let group of daysGrouped.slice(1)) {
                const datesStr = Object.keys(group);
                const dates = datesStr.map((s) => new Date(s));
                const next = lodash_1.default.find(dates, (d) => {
                    return d.getTime() - prev.getTime() == 24 * 60 * 60 * 1000;
                });
                if (next) {
                    seq.push(next);
                    prev = next;
                }
                else {
                    break;
                }
            }
            if (seq.length == body.days.length) {
                sequences.push(seq);
            }
        }
        const results = [];
        for (let seq of sequences) {
            const resSeq = [];
            for (let [i, d] of Object.entries(seq)) {
                const idx = Number.parseInt(i);
                const group = daysGrouped[idx][d.toISOString()];
                const fix = group.map((i) => [i.startISO, i.endISO]);
                resSeq.push(fix);
            }
            results.push(resSeq);
        }
        return {
            kind: shared_1.endpoints.DayResKind.Multiple,
            data: results,
        };
    },
};
