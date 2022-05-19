"use strict";

import { endpoints as e, types as t, helpers as h } from "shared";
import { entities } from "../../../utils";
import _ from "lodash";

/**
 * A set of functions called "actions" for `book-tools`
 */

module.exports = {
    book: async (ctx: any, next: any) => {
        strapi.log.info("In book-tools/index controller");

        const body = ctx.request.body;
        console.log(body);

        // // Getting data
        // const body: e.BookToolsBookReq = ctx.request.body;
        // const user: t.ID<t.UsersPermissionsUser> = ctx.state.user;

        // // Saving the ids of the created bookings
        // const ids: Array<string> = [];

        // // Creating bookings
        // for (let d of body.days) {
        //     for (let t of d.tool_ids) {
        //         const data: t.ToolBookingInput = {
        //             date: d.date,
        //             timeStart: d.time_start,
        //             timeEnd: d.time_end,
        //             tool: t,
        //         };
        //         const toolBooking: t.ID<t.ToolBooking> =
        //             await strapi.entityService.create(entities.toolBooking, {
        //                 data,
        //             });

        //         ids.push(toolBooking.id);
        //     }
        // }

        // console.log(ids);

        // // Creating master booking
        // const data: t.ToolsBookingInput = {
        //     bookings: ids,
        //     owner: user.id,
        // };
        // const toolsBooking: t.ID<t.ToolBooking> =
        //     await strapi.entityService.create(entities.toolsBooking, { data });

        // try {
        //     ctx.body = { ok: "ok" };
        // } catch (err) {
        //     ctx.body = { err };
        // }
    },

    /**
     *
     */

    checkAvailability: async (ctx: any, next: any) => {
        strapi.log.info("In book-tools/check-availability controller");

        const body: e.BookToolsCheckAvailabilityReq = ctx.request.body;

        /**
         * Getting all the required tools
         */

        let tool_ids = body.days.reduce((prev, curr) => {
            return [...prev, ...curr.tool_ids];
        }, [] as Array<string>);
        tool_ids = _.uniq(tool_ids);

        /**
         * Getting free slots for each tool
         */

        const date_start = new Date();
        const date_end = h.date.addDays(date_start, 7);

        const slots: Array<t.ID<t.ToolSlot>> =
            await strapi.entityService.findMany(entities.toolSlot, {
                populate: ["tool"],
                filters: {
                    $and: [
                        {
                            tool: {
                                id: {
                                    $in: tool_ids,
                                },
                            },
                        },
                        {
                            start: {
                                $gt: h.date.formatQueryDate(date_start),
                            },
                        },
                        {
                            end: {
                                $lt: h.date.formatQueryDate(date_end),
                            },
                        },
                    ],
                },
            });

        // Grouping slots by tool id
        const groups = _.groupBy(slots, (s) => (s.tool as t.ID<t.ToolSlot>).id);
        console.log(groups);

        /**
         * Calculating free slot groups
         */

        type FreeSlot = {
            start: string;
            end: string;
            length: number;
        };

        const availabilities: Record<string, Array<FreeSlot>> = {};

        // Storing results in availabilities calendar
        for (let toolID of Object.keys(groups)) {
            // Sorting slots
            const slots = groups[toolID];
            slots.sort((a, b) => {
                return Date.parse(a.start) - Date.parse(b.start);
            });

            // Getting free slots
            const freeSlots: Array<FreeSlot> = [];
            for (let [i, s] of slots.entries()) {
                if (i < slots.length - 1) {
                    const prevEnd = slots[i].end;
                    const nextStart = slots[i + 1].start;
                    if (prevEnd != nextStart) {
                        freeSlots.push({
                            start: prevEnd,
                            end: nextStart,
                            length: 1,
                        });
                    }
                }
            }

            // Calculating slot length
            for (let s of freeSlots) {
                // Difference in milliseconds
                let length = Date.parse(s.end) - Date.parse(s.start);
                // Converting to hours
                length = length / 1000 / 60 / 60;
                // Updating data
                s.length = length;
            }

            availabilities[toolID] = freeSlots;
        }

        /**
         * Dividing in days the calendar
         */

        //

        try {
            ctx.body = { tool_ids, slots };
        } catch (err) {
            ctx.body = { err };
        }
    },
};
