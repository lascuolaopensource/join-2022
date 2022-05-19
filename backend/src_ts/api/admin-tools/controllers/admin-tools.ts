import { endpoints as e, types as t, helpers as h } from "shared";
import { entities } from "../../../utils";
import _ from "lodash";

//

module.exports = {
    updateSlots: async (ctx: any, next: any) => {
        // Getting body
        const { changes } = ctx.request.body as e.AdminToolsUpdateSlotsReq;

        // Grouping changes by tool
        const groups = _.groupBy(changes, (c) => c.toolID);

        /**
         * Iterating for each tool
         */

        for (let [toolID, updates] of Object.entries(groups)) {
            //

            // Sorting updates by date
            updates.sort((a, b) => {
                return Date.parse(a.dateTime) - Date.parse(b.dateTime);
            });

            // Grouping updates by type / state
            const groups = _.groupBy(updates, (u) => u.state);

            /**
             * Finding adjacent groups (for each state)
             */

            for (let [state, updates] of Object.entries(groups)) {
                // Qui verranno salvati tutti i gruppi di modifiche adiacenti
                const adjacentUpdates: Array<Array<e.SlotUpdate>> = [];

                // Qui viene salvato temporaneamente il singolo gruppo di modifiche
                let tempGroup: Array<e.SlotUpdate> = [];

                // Qui si itera su tutte le modifiche
                for (let i = 0; i < updates.length; i++) {
                    tempGroup.push(updates[i]);

                    // Se si è arrivati alla fine delle modifiche
                    // Si salva l'ultimo gruppo
                    if (i + 1 >= updates.length) {
                        adjacentUpdates.push(tempGroup);
                        tempGroup = [];
                    }
                    // Altrimenti:
                    else {
                        // Si prende la data successiva
                        const prevDate = Date.parse(updates[i].dateTime);
                        const nextDate = Date.parse(updates[i + 1].dateTime);
                        const hour = 1000 * 60 * 60;

                        // E si vede se è adiacente alla presente
                        // Se non lo è, si "chiude" e si salva il gruppo
                        if ((nextDate - prevDate) / hour != 1) {
                            adjacentUpdates.push(tempGroup);
                            tempGroup = [];
                        }
                    }
                }

                console.log(adjacentUpdates);
            }
        }

        /**
         * Finding adjacent blocks
         */

        // Creating slots

        // for (let [id, slots] of Object.entries(freeSlots)) {
        //     for (let s of slots) {
        //         // Calculating end date
        //         const startDate = new Date(s[0]);
        //         const endDate = h.date.addHours(new Date(s[s.length - 1]), 1);

        //         // Creating data
        //         const data: t.ToolSlotInput = {
        //             start: startDate.toISOString(),
        //             end: endDate.toISOString(),
        //             tool: id,
        //             type: t.Enum_Toolslot_Type.Availability,
        //         };

        //         // Creating slot
        //         const slot: t.ID<t.ToolSlot> =
        //             await strapi.entityService.create(entities.toolSlot, {
        //                 data,
        //             });
        //     }
        // }

        // for (let c of changes) {
        // const start = c.dateTime;
        // const startDate = new Date(Date.parse(start));
        // const endDate = h.date.addHours(startDate, 1);
        // const end = endDate.toISOString();

        // // Removing slot if state === null
        // if (c.state === null) {
        //     // Finding matching slot
        //     const slots: Array<t.ID<t.ToolSlot>> =
        //         await strapi.entityService.findMany(entities.toolSlot, {
        //             filters: {
        //                 start,
        //                 end,
        //             },
        //         });
        //     for (let s of slots) {
        //         await strapi.entityService.delete(entities.toolSlot, s.id);
        //     }
        // }
        // // Otherwise creating slot
        // else if ((c.state = t.Enum_Toolslot_Type.Block)) {
        //     // Creating slot
        //     const data: t.ToolSlotInput = {
        //         start,
        //         end,
        //         type: t.Enum_Toolslot_Type.Block,
        //         tool: c.toolID,
        //     };
        //     const slot: t.ID<t.ToolSlot> =
        //         await strapi.entityService.create(entities.toolSlot, {
        //             data,
        //         });
        // }
        // }

        return {};
    },
};
