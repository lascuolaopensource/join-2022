"use strict";

import { endpoints as e, types as t, helpers as h } from "shared";
import { entities, date, slots as ss } from "../../../utils";
import _ from "lodash";

/**
 * A set of functions called "actions" for `book-tools`
 */

module.exports = {
    book: async (ctx: any, next: any) => {
        strapi.log.info("In book-tools/index controller");

        // Getting data
        const body: e.BookToolsReq = ctx.request.body;
        const user: t.ID<t.UsersPermissionsUser> = ctx.state.user;

        /**
         * Creating master booking
         */

        const data: t.ToolsBookingInput = {
            slots: [],
            owner: user.id,
        };
        const toolsBooking: t.ID<t.ToolsBooking> =
            await strapi.entityService.create(entities.toolsBooking, { data });

        /**
         * Creating slots
         */

        // Saving the ids of the created slots
        const slots: Array<string> = [];

        // Creating slots
        for (let d of body.days) {
            for (let toolID of d.tool_ids) {
                const data: t.ToolSlotInput = {
                    start: d.start,
                    end: d.end,
                    tool: toolID,
                    type: t.Enum_Toolslot_Type.Booking,
                    booking: toolsBooking.id,
                };

                const toolSlot: t.ID<t.ToolSlot> =
                    await strapi.entityService.create(entities.toolSlot, {
                        data,
                    });

                slots.push(toolSlot.id);

                /**
                 * TODO: Bisogna splittare gli slot di disponibilità
                 */
                await ss.breakAvailabilitySlot(data);
            }
        }

        /**
         * Updating master booking
         */

        const updateData: t.ToolsBookingInput = {
            slots,
        };
        await strapi.entityService.update(
            entities.toolsBooking,
            toolsBooking.id,
            { data }
        );

        //

        try {
            ctx.body = { ok: "ok" };
        } catch (err) {
            ctx.body = { err };
        }
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

        /**
         * Time data
         */

        // Getting date range
        let date_start = new Date();
        let date_end = h.date.setHours(
            h.date.addDays(date_start, 7),
            0,
            0,
            0,
            0
        );

        // Time increment (to Fix)
        const INCR = 60 * 60 * 1000;

        const startDate = "2022-05-23T06:00:00Z";
        const endDate = "2022-05-29T09:00:00Z";

        const iterations = Math.abs(date.dateDiff(startDate, endDate)) / INCR;

        /**
         *
         */

        const results: Record<string, Array<[Date, Date]>> = {};

        for (let [dayIndex, day] of Object.entries(body.days)) {
            // Getting tool ids
            const tool_ids = day.tool_ids;

            // Getting slots
            let slots = await getSlots(tool_ids, startDate, endDate);

            // Filtering slots based on length
            slots = slots.filter((s) => {
                const length = (Date.parse(s.end) - Date.parse(s.start)) / INCR;
                return length >= day.hours;
            });

            // Grouping
            const groups = _.groupBy(slots, (s) => (s.tool as t.ID<t.Tool>).id);

            // Creating empty calendar / table
            // Record<ISOdate, Record<toolID, available>>
            const calendar: Record<string, Record<string, boolean>> = {};
            for (let i = 0; i < iterations; i++) {
                // Getting current date
                const currDate = h.date.addTime(new Date(startDate), i * INCR);
                // Adding row
                calendar[currDate.toISOString()] = {};
                // Adding items to row
                for (let toolID of tool_ids) {
                    calendar[currDate.toISOString()][toolID] = false;
                }
            }

            // Adding true when required
            for (let [toolID, slots] of Object.entries(groups)) {
                for (let slot of slots) {
                    const iterations =
                        Math.abs(date.dateDiff(slot.start, slot.end)) / INCR;
                    for (let i = 0; i < iterations; i++) {
                        const currDate = h.date.addTime(
                            new Date(slot.start),
                            i * INCR
                        );
                        if (calendar[currDate.toISOString()]) {
                            calendar[currDate.toISOString()][toolID] =
                                slot.type == t.Enum_Toolslot_Type.Availability;
                        }
                    }
                }
            }

            // Inspecting calendar
            let cursorDate = new Date(startDate);
            const cursorSize = day.hours;

            const savedCombos: Array<[Date, Date]> = [];

            // Idealmente, si itera per tutte le righe
            for (
                let i = 0;
                i < Object.values(calendar).length - day.hours;
                i++
            ) {
                // Listing cursor dates
                const cursorDates: Array<Date> = [];
                for (let j = 0; j < cursorSize; j++) {
                    const date = h.date.addTime(cursorDate, j * INCR);
                    cursorDates.push(date);
                }

                // Cursor
                const cursor: Array<Record<string, boolean>> = [];
                for (let date of cursorDates) {
                    cursor.push(calendar[date.toISOString()]);
                }

                // Checking state of things in cursor
                const bools: Array<boolean> = [];
                for (let row of cursor) {
                    bools.push(...Object.values(row));
                }

                // If all bools are true, save combo
                if (bools.every((b) => b)) {
                    savedCombos.push([
                        cursorDates[0],
                        h.date.addTime(
                            cursorDates[cursorDates.length - 1],
                            INCR
                        ),
                    ]);
                    cursorDate = h.date.addTime(cursorDate, INCR);
                } else if (bools.some((b) => b)) {
                    cursorDate = h.date.addTime(cursorDate, INCR);
                } else {
                    cursorDate = h.date.addTime(cursorDate, cursorSize * INCR);
                }

                if (
                    Math.abs(
                        cursorDate.getTime() - new Date(endDate).getTime()
                    ) <=
                    cursorSize * INCR
                ) {
                    break;
                }
            }

            results[dayIndex] = savedCombos;
        }

        /**
         * Pairing the days
         */

        // Grouping by days
        const resultsGrouped: Record<
            string,
            Record<string, Array<[Date, Date]>>
        > = {};

        for (let [day, res] of Object.entries(results)) {
            const groups = _.groupBy(res, (i) => {
                const dayCopy = h.date.setHours(i[0], 0, 0, 0, 0);
                return dayCopy.toISOString();
            });

            resultsGrouped[day] = groups;
        }

        // If just one day, returning
        if (Object.keys(resultsGrouped).length == 1) {
            return { kind: e.DayResKind.Single, data: resultsGrouped["0"] };
        }

        // Per ogni giorno, vediamo se c'è un "successivo" disponibile
        const length = Object.keys(resultsGrouped).length;

        const savedCombos: Array<
            Array<{
                day: string;
                options: Array<[Date, Date]>;
            }>
        > = [];

        for (let [date, options] of Object.entries(resultsGrouped["0"])) {
            let currDate = new Date(date);
            let tempCollection: Array<{
                day: string;
                options: Array<[Date, Date]>;
            }> = [];

            for (let i = 0; i < length; i++) {
                let nextDate = h.date.addDays(currDate, i);

                // Qui si può rinforzare la logica verificando che l'array abbia lunghezza
                if (nextDate.toISOString() in resultsGrouped[i.toString()]) {
                    tempCollection.push({
                        day: i.toString(),
                        options:
                            resultsGrouped[i.toString()][
                                nextDate.toISOString()
                            ],
                    });
                }
                //
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
            kind: e.DayResKind.Multiple,
            data: savedCombos,
        };
    },
};

/**
 *
 */

async function getSlots(
    tool_ids: Array<string>,
    dateStart: string,
    dateEnd: string
): Promise<Array<t.ID<t.ToolSlot>>> {
    //
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
                $eq: t.Enum_Toolslot_Type.Availability,
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

    const slots: Array<t.ID<t.ToolSlot>> = await strapi.entityService.findMany(
        entities.toolSlot,
        {
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
        }
    );
    return slots;
}
