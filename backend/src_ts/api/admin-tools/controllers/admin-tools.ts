import { endpoints as e, types as t, helpers as h } from "shared";
import { entities, date, slots } from "../../../utils";
import _ from "lodash";

//

module.exports = {
    updateSlots: async (ctx: any, next: any) => {
        // Getting body
        const body = ctx.request.body as e.AdminToolsUpdateSlotsReq;

        /**
         * Iterating for each tool
         */

        for (let [toolID, toolUpdates] of Object.entries(body)) {
            // Grouping updates by type / state
            const groups = _.groupBy(toolUpdates, (u) => u.type);

            // Qui salveremo gli update per tipo
            const updates: Record<string, Array<t.ToolSlotInput>> = {};

            /**
             * Grouping & merging
             */

            for (let [state, stateUpdates] of Object.entries(groups)) {
                // Sorting updates by date
                stateUpdates.sort((a, b) => {
                    return date.dateDiff(a.start, b.start);
                });

                // Grouping updates by proximity
                const groupedUpdates = groupSlotUpdates(stateUpdates);
                // Merging groups
                const toolSlotUpdates = groupedUpdates.map((g) =>
                    mergeUpdatesGroup(g)
                );

                // Saving
                updates[state] = toolSlotUpdates;
            }

            /**
             * Writing to database
             */

            for (let updateGroup of Object.values(updates)) {
                for (let update of updateGroup) {
                    // If is availability, we create
                    if (update.type == t.Enum_Toolslot_Type.Availability) {
                        await strapi.entityService.create(entities.toolSlot, {
                            data: update,
                        });
                    }
                    // If is null, we break an existing slot
                    else {
                        await slots.breakAvailabilitySlot(update);
                    }
                }
            }

            /**
             * Last pass: merging the availability slots
             */

            // Getting one day before edits
            const startDates = toolUpdates
                .map((u) => u.start)
                .sort((a, b) => date.dateDiff(a, b));
            const startDate = new Date(startDates[0]);
            startDate.setHours(0, 0, 0, 0);
            const beforeDate = h.date.addDays(startDate, -1);

            // Getting one day after edits
            const endDates = toolUpdates
                .map((u) => u.end)
                .sort((a, b) => date.dateDiff(a, b));
            const endDate = new Date(endDates[endDates.length - 1]);
            endDate.setHours(0, 0, 0, 0);
            const afterDate = h.date.addDays(endDate, 1);

            // Getting all the slots between the dates
            const availSlots = await slots.findSlotsBetween(
                beforeDate.toISOString(),
                afterDate.toISOString(),
                toolID,
                t.Enum_Toolslot_Type.Availability
            );

            // Grouping slots
            const groupedSlots = groupSlotUpdates(
                availSlots.map((s) => slots.slotToInput(s))
            );
            const mergedSlots = groupedSlots.map((g) => mergeUpdatesGroup(g));

            // Deleting the found slots
            for (let a of availSlots) {
                await strapi.entityService.delete(entities.toolSlot, a.id);
            }

            // Creating new slots
            for (let m of mergedSlots) {
                await strapi.entityService.create(entities.toolSlot, {
                    data: m,
                });
            }
        }

        return {};
    },
};

/**
 * Questa funzione raggruppa una lista di slotUpdate per prossimità
 * @param updates Una lista di slot updates, tutti dello stesso tipo
 * @returns Una lista di gruppi (array) che si trovano alla distanza prefissata
 */

function groupSlotUpdates(
    updates: Array<t.ToolSlotInput>
): Array<Array<t.ToolSlotInput>> {
    checkGroupConsistency(updates);
    updates = sortToolSlotArray(updates);

    // Qui verranno salvati tutti i gruppi di modifiche adiacenti
    const groupedUpdates: Array<Array<t.ToolSlotInput>> = [];

    // Qui viene salvato temporaneamente il singolo gruppo di modifiche
    let tempGroup: Array<t.ToolSlotInput> = [];

    // Qui si itera su tutte le modifiche
    for (let i = 0; i < updates.length; i++) {
        // Si aggiunge a prescindere il primo update
        tempGroup.push(updates[i]);

        // Se si è arrivati all'ultima modifica
        // Si salva l'ultimo gruppo
        if (i + 1 >= updates.length) {
            groupedUpdates.push(tempGroup);
            tempGroup = [];
        }
        // Altrimenti:
        // Se la data di fine del blocco corrente
        // è diversa dalla data di inizio del successivo
        // si "chiude" il gruppo e si salva
        else {
            if (updates[i].end != updates[i + 1].start) {
                groupedUpdates.push(tempGroup);
                tempGroup = [];
            }
        }
    }

    return groupedUpdates;
}

/**
 * Unisce diversi ToolSlotInput in un unico
 * @param group Array<ToolSlotInput>
 * @returns ToolSlotInput
 */

function mergeUpdatesGroup(group: Array<t.ToolSlotInput>): t.ToolSlotInput {
    checkGroupConsistency(group);
    group = sortToolSlotArray(group);

    return {
        start: group[0].start,
        end: group[group.length - 1].end,
        tool: group[0].tool,
        type: group[0].type,
    };
}

/**
 * Verifica che degli ToolSlotInput abbiamo lo stesso type e tool
 * @param group Array<ToolSlotInput>
 */

function checkGroupConsistency(group: Array<t.ToolSlotInput>): void {
    // Si verifica che tutti gli update abbiano lo stesso tipo e lo stesso strumento
    const sameType = group.every((s) => s.type === group[0].type);
    const sameTool = group.every((s) => s.tool === group[0].tool);

    if (!sameTool || !sameType) {
        throw new Error("unequalUpdates");
    }
}

/**
 *
 */

function sortToolSlotArray(a: Array<t.ToolSlotInput>) {
    return a.sort((a, b) => date.dateDiff(a.start, b.start));
}
