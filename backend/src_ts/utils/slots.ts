import { helpers, types as t } from "shared";
import { entities } from "./entities";
import { dateDiff } from "./date";
import { ToolSlot, ToolSlotInput } from "shared/dist/types";

//

export type BaseAlignmentTable = Record<string, Array<boolean>>;
export type AlignmentTableRow = {
    start: Date;
    end: Date;
    values: Array<boolean>;
};
export type AlignmentTable = Array<AlignmentTableRow>;

/**
 *
 */

export class Interval {
    readonly start: number;
    readonly end: number;

    constructor(start: number, end: number) {
        if (end < start) throw new Error("InvalidIntervalData");
        this.start = start;
        this.end = end;
    }

    get length(): number {
        return this.end - this.start;
    }

    overlaps(i: Interval): boolean {
        return !(i.end <= this.start || i.start >= this.end);
    }

    includes(i: Interval): boolean {
        return this.start <= i.start && this.end >= i.end;
    }

    equals(i: Interval): boolean {
        return this.start == i.start && this.end == i.end;
    }

    subtract(i: Interval): Array<Interval> {
        if (!this.overlaps(i)) throw new Error("IntervalsNotOverlapping");
        if (i.includes(this) && !this.equals(i))
            throw new Error("IntervalBiggerThanBase");

        const leftovers: Array<Interval> = [];

        if (this.equals(i)) return leftovers;

        if (this.end > i.end) leftovers.push(new Interval(i.end, this.end));
        if (this.start < i.start)
            leftovers.push(new Interval(this.start, i.start));

        return leftovers;
    }

    //

    isMultipleofLength(l: number): boolean {
        return Number.isInteger(this.length / l);
    }

    divideByLength(l: number): Array<Interval> {
        // Array to store chunks
        const chunks: Array<Interval> = [];

        // Saving chunks
        let start = this.start;
        let end = start + l;
        while (end <= this.end) {
            chunks.push(new Interval(start, end));
            start = end;
            end = start + l;
        }

        // Measuring leftover
        const leftover = this.end - start;

        // Saving leftover space
        if (leftover > 0) {
            chunks.push(new Interval(start, this.end));
        }

        return chunks;
    }
}

/**
 *
 */

export class DateInterval {
    start: Date;
    end: Date;
    interval: Interval;

    constructor(start: Date, end: Date) {
        this.start = start;
        this.end = end;
        this.interval = new Interval(start.getTime(), end.getTime());
    }

    get startISO(): string {
        return this.start.toISOString();
    }

    get endISO(): string {
        return this.end.toISOString();
    }

    divideByLength(l: number): Array<DateInterval> {
        return this.interval.divideByLength(l).map((i) => {
            return new DateInterval(new Date(i.start), new Date(i.end));
        });
    }
}

/**
 *
 */

export class AligmentCalendar {
    step: number;
    dateInterval: DateInterval;
    intervals: Array<DateInterval>;

    constructor(start: Date, end: Date, step: number) {
        this.step = step;
        this.dateInterval = new DateInterval(start, end);
        this.intervals = [];
        if (!this.dateInterval.interval.isMultipleofLength(this.step)) {
            throw new Error("InvalidStepLength");
        }
    }

    addInterval(i: DateInterval): void {
        this.intervals.push(i);
    }

    addIntervals(a: Array<DateInterval>): void {
        a.forEach((i) => {
            this.addInterval(i);
        });
    }

    createTable(): AlignmentTable {
        // Creating empty base table
        const baseTable: BaseAlignmentTable = {};
        // Filling with empty arrays
        const steps = this.dateInterval.divideByLength(this.step);
        for (let step of steps) {
            baseTable[step.startISO] = [];
        }
        // Adding content to arrays
        for (let int of this.intervals) {
            const steps = int.divideByLength(this.step);
            for (let step of steps) {
                if (!(step.startISO in baseTable)) {
                    throw new Error("StepNotInTable");
                }
                baseTable[step.startISO].push(true);
            }
        }
        // Converting record to array
        const table: AlignmentTable = [];
        for (let [key, value] of Object.entries(baseTable)) {
            table.push({
                start: new Date(key),
                end: helpers.date.addTime(new Date(key), this.step),
                values: value,
            });
        }
        // Sorting table
        table.sort((a, b) => a.start.getTime() - b.start.getTime());
        //
        return table;
    }

    checkAlignments(width: number, height: number): Array<DateInterval> {
        const table = this.createTable();
        const intervals: Array<DateInterval> = [];
        for (let i = 0; i < table.length - height; i++) {
            // Filling cursor
            const cursor: AlignmentTable = [];
            for (let s = 0; s < height; s++) {
                cursor.push(table[i + s]);
            }
            // Checking cursor
            const valid = cursor.every(
                (r) => r.values.every((v) => v) && r.values.length == width
            );
            //
            if (valid) {
                const start = cursor[0].start;
                const end = cursor[height - 1].end;
                intervals.push(new DateInterval(start, end));
            }
        }
        return intervals;
    }
}

/**
 * Converts a slot to an interval
 * @param s The slot
 * @returns The Interval
 */

export function slotToInterval(s: ToolSlotInput | ToolSlot): Interval {
    const start = Date.parse(s.start);
    const end = Date.parse(s.end);
    return new Interval(start, end);
}

/**
 * Converts a slot to a date interval
 * @param s The slot
 * @returns The DateInterval
 */

export function slotToDateInterval(s: ToolSlotInput | ToolSlot): DateInterval {
    const start = new Date(s.start);
    const end = new Date(s.end);
    return new DateInterval(start, end);
}

/**
 * Ordina un array di ToolSlot
 * @param a Array<t.ToolSlotInput>
 * @returns L'array modificato
 */

export function sortSlots(a: Array<t.ToolSlotInput>): Array<t.ToolSlotInput> {
    return a.sort((a, b) => dateDiff(a.start, b.start));
}

/**
 * Verifica che ToolSlotInput abbiamo lo stesso type e tool
 * @param group Array<ToolSlotInput>
 */

export function checkSlotsConsistency(group: Array<t.ToolSlotInput>): boolean {
    // Si verifica che tutti gli update abbiano lo stesso tipo e lo stesso strumento
    const sameType = group.every((s) => s.type === group[0].type);
    const sameTool = group.every((s) => s.tool === group[0].tool);

    if (!sameTool || !sameType) {
        throw new Error("unequalUpdates");
    }

    return sameTool && sameType;
}

/**
 * Raggruppa una lista di ToolSlots per prossimità
 * @param a Una lista di ToolSlots, tutti dello stesso tipo
 * @returns Una lista di Array<ToolSlots> che sono adiacenti
 */

export function groupSlots(
    a: Array<t.ToolSlotInput>
): Array<Array<t.ToolSlotInput>> {
    checkSlotsConsistency(a);
    sortSlots(a);

    // Qui verranno salvati tutti i gruppi di modifiche adiacenti
    const groupedSlots: Array<Array<t.ToolSlotInput>> = [];

    // Qui viene salvato temporaneamente il singolo gruppo di modifiche
    let tempGroup: Array<t.ToolSlotInput> = [];

    // Qui si itera su tutte le modifiche
    for (let i = 0; i < a.length; i++) {
        // Si aggiunge a prescindere il primo update
        tempGroup.push(a[i]);

        // Se si è arrivati all'ultima modifica
        // Si salva l'ultimo gruppo
        if (i + 1 == a.length) {
            groupedSlots.push(tempGroup);
            tempGroup = [];
        }
        // Altrimenti:
        // Se la data di fine del blocco corrente
        // è diversa dalla data di inizio del successivo
        // si "chiude" il gruppo e si salva
        else {
            if (a[i].end != a[i + 1].start) {
                groupedSlots.push(tempGroup);
                tempGroup = [];
            }
        }
    }

    return groupedSlots;
}

/**
 * Unisce diversi ToolSlotInput in un unico
 * @param group Array<ToolSlotInput>
 * @returns ToolSlotInput
 */

export function mergeSlotsGroup(
    group: Array<t.ToolSlotInput>
): t.ToolSlotInput {
    checkSlotsConsistency(group);
    sortSlots(group);

    return {
        start: group[0].start,
        end: group[group.length - 1].end,
        tool: group[0].tool,
        type: group[0].type,
    };
}

/**
 * Raggruppa diversi ToolSlot per prossimità e poi li unisce
 * @param a Array<t.ToolSlotInput>
 * @returns Array<t.ToolSlotInput>
 */

export function groupMergeSlots(
    a: Array<t.ToolSlotInput>
): Array<t.ToolSlotInput> {
    const groups = groupSlots(a);
    const merges = groups.map((g) => mergeSlotsGroup(g));
    return merges;
}

/**
 * Cerca uno Slot che avvolge quello fornito
 * Serve per trovare lo slot di disponibilità da rompere
 * Si intende che il tool sia lo stesso
 * @param slot Lo slot di cui bisogna cercare l'"avvolgente"
 * @param type Il tipo di slot da cercare: Availability o Booking
 * @returns Lo slot avvolgente
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
 * "Rompe" uno slot di disponibilità in parti,
 * inserendo al suo interno uno spazio vuoto
 * @param boundingSlot Lo slot avvolgente
 * @param breakingSlot Lo spazio da rimuovere dallo slot
 */

export async function breakAvailabilitySlot(
    boundingSlot: t.ID<t.ToolSlot>,
    breakingSlot: t.ToolSlotInput
): Promise<void> {
    // Creating the intervals
    const boundInt = slotToInterval(boundingSlot);
    const breakInt = slotToInterval(breakingSlot);

    try {
        // Subtracting the interval
        const leftovers = boundInt.subtract(breakInt);
        for (let l of leftovers) {
            const data: t.ToolSlotInput = {
                start: new Date(l.start),
                end: new Date(l.end),
                type: t.Enum_Toolslot_Type.Availability,
                tool: breakingSlot.tool,
            };
            await strapi.entityService.create(entities.toolSlot, { data });
        }

        // Deleting the initial slot
        await strapi.entityService.delete(entities.toolSlot, boundingSlot.id);
    } catch (e) {
        console.log(e);
    }
}

/**
 * Utility: converte ID<ToolSlot> in ToolSlotInput
 * @param s ID<ToolSlot>)
 * @returns ToolSlotInput
 */

export function slotToInput(s: t.ID<t.ToolSlot>): t.ToolSlotInput {
    return {
        start: s.start,
        end: s.end,
        tool: (s.tool as t.ID<t.Tool>).id,
        type: s.type,
    };
}

/**
 * Gets the first date from an array of slots
 * @param a Array of slots
 * @returns The first date
 */

export function getFirstDate(a: Array<t.ToolSlot | t.ToolSlotInput>): Date {
    const startDates = a.map((s) => s.start).sort((a, b) => dateDiff(a, b));
    return new Date(startDates[0]);
}

export function getLastDate(a: Array<t.ToolSlot | t.ToolSlotInput>): Date {
    const endDates = a.map((s) => s.end).sort((a, b) => dateDiff(a, b));
    return new Date(endDates[endDates.length - 1]);
}

/**
 *
 * @param start
 * @param end
 * @param tool
 * @param type
 * @returns
 */

export async function findSlotsBetween(
    start: string,
    end: string,
    tools: Array<string>,
    type: t.Enum_Toolslot_Type
): Promise<Array<t.ID<t.ToolSlot>>> {
    const slots: Array<t.ID<t.ToolSlot>> = await strapi.entityService.findMany(
        entities.toolSlot,
        {
            populate: ["tool"],
            filters: {
                $and: [
                    { start: { $lt: end } },
                    { end: { $gt: start } },
                    { tool: { id: { $in: tools } } },
                    { type: { $eq: type } },
                ],
            },
        }
    );

    return slots;
}
