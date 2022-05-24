import { types as t } from "shared";
import { entities } from "./entities";

/**
 *
 * @param slot
 * @returns
 */
export async function getBoundingSlot(
    slot: t.ToolSlotInput,
    type = t.Enum_Toolslot_Type.Availability
): Promise<t.ID<t.ToolSlot>> {
    // Getting the availability slot that contains the blockSlot
    const availSlot: Array<t.ID<t.ToolSlot>> =
        await strapi.entityService.findMany(entities.toolSlot, {
            populate: ["tool"],
            filters: {
                $and: [
                    {
                        start: {
                            $lte: slot.start,
                        },
                    },
                    {
                        end: {
                            $gte: slot.end,
                        },
                    },
                    {
                        tool: {
                            id: {
                                $eq: slot.tool,
                            },
                        },
                    },
                    {
                        type: {
                            $eq: type,
                        },
                    },
                ],
            },
        });

    if (availSlot.length == 1) {
        return availSlot[0];
    } else {
        throw new Error("slotNotFound");
    }
}

/**
 *
 * @param slot
 */

export async function breakAvailabilitySlot(
    slot: t.ToolSlotInput
): Promise<void> {
    // Getting bounding slot
    let slotToBreak: t.ID<t.ToolSlot>;
    try {
        slotToBreak = await getBoundingSlot(
            slot,
            t.Enum_Toolslot_Type.Availability
        );
    } catch (e) {
        throw e;
    }

    // Creating the before slot
    if (slotToBreak.start != slot.start) {
        const beforeSlot: t.ToolSlotInput = {
            start: slotToBreak.start,
            end: slot.start,
            type: t.Enum_Toolslot_Type.Availability,
            tool: slot.tool,
        };
        await strapi.entityService.create(entities.toolSlot, {
            data: beforeSlot,
        });
    }

    // Creating the before slot
    if (slotToBreak.end != slot.end) {
        const afterSlot: t.ToolSlotInput = {
            start: slot.end,
            end: slotToBreak.end,
            type: t.Enum_Toolslot_Type.Availability,
            tool: slot.tool,
        };
        await strapi.entityService.create(entities.toolSlot, {
            data: afterSlot,
        });
    }

    // Deleting the initial slot
    await strapi.entityService.delete(entities.toolSlot, slotToBreak.id);
}

/**
 *
 * @param s
 * @returns
 */

export function slotToInput(s: t.ID<t.ToolSlot>): t.ToolSlotInput {
    return {
        start: s.start,
        end: s.end,
        tool: (s.tool as t.ID<t.Tool>).id,
        type: s.type,
    };
}
