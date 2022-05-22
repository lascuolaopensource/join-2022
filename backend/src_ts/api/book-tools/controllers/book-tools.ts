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

        // Getting date range
        let date_start = new Date();
        let date_end = h.date.setHours(
            h.date.addDays(date_start, 1),
            0,
            0,
            0,
            0
        );

        // Fix number 7
        for (let i = 0; i < 7; i++) {
            // Getting tool ids
            const tool_ids = body.days[0].tool_ids;

            // Getting slots
            let slots = await getSlots(
                tool_ids,
                date_start.toISOString(),
                date_end.toISOString()
            );

            // Filtering slots based on length
            slots = slots.filter((s) => {
                const hour = 1000 * 60 * 60;
                const length = (Date.parse(s.end) - Date.parse(s.start)) / hour;
                return length >= body.days[0].hours;
            });

            slots.sort((a, b) => {
                return Date.parse(a.start) - Date.parse(b.end);
            });

            // Updating dateStart, dateEnd
        }

        try {
            ctx.body = {};
        } catch (err) {
            ctx.body = { err };
        }
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
    const slots: Array<t.ID<t.ToolSlot>> = await strapi.entityService.findMany(
        entities.toolSlot,
        {
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
                            $gt: dateStart,
                        },
                    },
                    {
                        end: {
                            $lt: dateEnd,
                        },
                    },
                    {
                        type: {
                            $eq: t.Enum_Toolslot_Type.Availability,
                        },
                    },
                ],
            },
        }
    );
    return slots;
}
