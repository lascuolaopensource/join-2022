"use strict";

import { endpoints as e, types as t, helpers as h } from "shared";
import { entities, date as d, slots as s } from "../../../utils";
import _ from "lodash";

/**
 *
 */

const TIMESTEP = 60 * 60 * 1000;

/**
 * A set of functions called "actions" for `book-tools`
 */

module.exports = {
    book: async (ctx: any, next: any) => {
        strapi.log.info("In book-tools/index controller");

        // // Getting data
        // const body: e.BookToolsReq = ctx.request.body;
        // const user: t.ID<t.UsersPermissionsUser> = ctx.state.user;

        // /**
        //  * Creating master booking
        //  */

        // const data: t.ToolsBookingInput = {
        //     slots: [],
        //     owner: user.id,
        // };
        // const toolsBooking: t.ID<t.ToolsBooking> =
        //     await strapi.entityService.create(entities.toolsBooking, { data });

        // /**
        //  * Creating slots
        //  */

        // // Saving the ids of the created slots
        // const slots: Array<string> = [];

        // // Creating slots
        // for (let d of body.days) {
        //     for (let toolID of d.tool_ids) {
        //         const data: t.ToolSlotInput = {
        //             start: d.start,
        //             end: d.end,
        //             tool: toolID,
        //             type: t.Enum_Toolslot_Type.Booking,
        //             booking: toolsBooking.id,
        //         };

        //         const toolSlot: t.ID<t.ToolSlot> =
        //             await strapi.entityService.create(entities.toolSlot, {
        //                 data,
        //             });

        //         slots.push(toolSlot.id);

        //         /**
        //          * TODO: Bisogna splittare gli slot di disponibilità
        //          */
        //         await ss.breakAvailabilitySlot(data);
        //     }
        // }

        // /**
        //  * Updating master booking
        //  */

        // const updateData: t.ToolsBookingInput = {
        //     slots,
        // };
        // await strapi.entityService.update(
        //     entities.toolsBooking,
        //     toolsBooking.id,
        //     { data }
        // );

        // //

        // try {
        //     ctx.body = { ok: "ok" };
        // } catch (err) {
        //     ctx.body = { err };
        // }
    },

    /**
     *
     */

    checkAvailability: async (
        ctx: any,
        next: any
    ): Promise<e.BookToolsCheckAvailabilityRes> => {
        strapi.log.info("In book-tools/check-availability controller");

        const body: e.BookToolsCheckAvailabilityReq = ctx.request.body;

        console.log(body);

        /**
         * Time data
         */

        // Getting date range
        let date_start = new Date(Date.parse(body.start));
        date_start.setHours(0, 0, 0, 0);
        date_start = h.date.addDays(date_start, 1);
        const date_end = h.date.addDays(date_start, 7);

        /**
         * Iterating for each day
         */

        const daysResults: Array<Array<s.DateInterval>> = [];

        for (let day of body.days) {
            // Getting slots
            let slots = await s.findSlotsBetween(
                date_start.toISOString(),
                date_end.toISOString(),
                day.tools,
                t.Enum_Toolslot_Type.Availability
            );

            // Filtering slots based on length
            slots = slots.filter((slot) => {
                const length =
                    (Date.parse(slot.end) - Date.parse(slot.start)) / TIMESTEP;
                return length >= day.hours;
            });

            // Checking if all slots are valid
            const areSlotsValid = slots.every((slot) => {
                return s.slotToInterval(slot).isMultipleofLength(TIMESTEP);
            });
            if (!areSlotsValid) {
                throw new Error("InvalidSlotsLength");
            }

            // Si suppone che intervalli dello stesso strumento non si sovrappongano
            const cal = new s.AligmentCalendar(date_start, date_end, TIMESTEP);

            // Convertiamo gli slot in intervalli
            const ints = slots.map((slot) => s.slotToDateInterval(slot));
            // Adding intervals
            cal.addIntervals(ints);

            daysResults.push(cal.checkAlignments(day.tools.length, day.hours));
        }

        /**
         * Returning
         */

        // Returning if just one day
        if (body.days.length == 1) {
            return {
                kind: e.DayResKind.Single,
                data: daysResults[0].map((i) => [i.startISO, i.endISO]),
            };
        }

        // Otherwise, grouping the days
        // Per ogni giorno, vediamo se c'è un "successivo" disponibile
        const daysGrouped: Array<Record<string, Array<s.DateInterval>>> = [];
        for (let dayResult of daysResults) {
            const groups = _.groupBy(dayResult, (i) =>
                h.date.setHours(i.start, 0, 0, 0, 0).toISOString()
            );
            daysGrouped.push(groups);
        }

        //
        const sequences: Array<Array<Date>> = [];
        for (let startStr in daysGrouped[0]) {
            const start = new Date(startStr);
            let prev = start;
            const seq: Array<Date> = [start];
            //
            for (let group of daysGrouped.slice(1)) {
                const datesStr = Object.keys(group);
                const dates = datesStr.map((s) => new Date(s));
                const next = _.find(dates, (d) => {
                    return d.getTime() - prev.getTime() == 24 * 60 * 60 * 1000;
                });
                if (next) {
                    seq.push(next);
                    prev = next;
                } else {
                    break;
                }
            }
            if (seq.length == body.days.length) {
                sequences.push(seq);
            }
        }

        //
        const results: Array<Array<Array<[string, string]>>> = [];
        for (let seq of sequences) {
            const resSeq: Array<Array<[string, string]>> = [];
            for (let [i, d] of Object.entries(seq)) {
                const idx = Number.parseInt(i);
                const group = daysGrouped[idx][d.toISOString()];
                const fix = group.map((i) => [i.startISO, i.endISO]) as Array<
                    [string, string]
                >;
                resSeq.push(fix);
            }
            results.push(resSeq);
        }

        return {
            kind: e.DayResKind.Multiple,
            data: results,
        };
    },
};
