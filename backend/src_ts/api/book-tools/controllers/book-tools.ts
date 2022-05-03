"use strict";

import { endpoints as e, types as t } from "shared";
import { entities } from "../../../utils";

/**
 * A set of functions called "actions" for `book-tools`
 */

module.exports = {
    book: async (ctx: any, next: any) => {
        strapi.log.info("In book-tools/index controller");

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
        console.log(body);

        try {
            ctx.body = { ok: "ok" };
        } catch (err) {
            ctx.body = { err };
        }
    },
};
