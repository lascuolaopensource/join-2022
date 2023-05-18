import { ToolCalendarCell } from './ToolCalendarCell';
import { helpers as h, types as t } from 'shared';

//

export class ToolCalendar {
	toolID: string;
	cells: Record<string, ToolCalendarCell>;
	dates: Array<Date>;
	slots: Array<t.ToolSlotEntity>;
	timeStep: number;

	constructor(toolID: string, dates: Array<Date>, timeStep: number) {
		this.toolID = toolID;
		this.dates = dates;
		this.timeStep = timeStep;

		this.cells = {};
		this.setupCells();

		this.slots = [];
	}

	// Setup

	setupCells(): void {
		for (let d of this.dates) {
			for (let t of h.date.splitDayInSlots(this.timeStep)) {
				const start = h.date.addTime(d, t);
				this.cells[start.toISOString()] = new ToolCalendarCell(start);
			}
		}
	}

	// Getters

	getCells(): Array<ToolCalendarCell> {
		return Object.values(this.cells);
	}

	getDates(): Array<Date> {
		// Getting
		const datesStr = Object.keys(this.cells);
		// Converting in dates
		const dates = datesStr.map((d) => new Date(d));
		// Sorting
		dates.sort((a, b) => {
			return a.getTime() - b.getTime();
		});

		return dates;
	}

	getStartDate(): Date {
		return this.getDates()[0];
	}

	// Edits management

	getEdits(): Array<t.ToolSlotInput> {
		const edits: Array<t.ToolSlotInput> = [];
		for (let [dateStr, cell] of Object.entries(this.cells)) {
			if (cell.edited) {
				edits.push({
					tool: this.toolID,
					start: dateStr,
					end: h.date.addTime(new Date(dateStr), this.timeStep).toISOString(),
					type: cell.type
				});
			}
		}
		return edits;
	}

	resetEdits() {
		for (let c of this.getCells()) {
			c.reset();
		}
	}

	editsExist(): boolean {
		return this.getEdits().length >= 1;
	}

	//

	renderSlot(s: t.ToolSlotEntity): void {
		if (s.attributes?.tool?.data?.id != this.toolID) {
			throw new Error('InvalidToolSlot');
		}

		// Calculating slot length
		const slotLengthMS =
			Date.parse(s.attributes.end) - Date.parse(s.attributes.start);
		const slotLength = Math.round(slotLengthMS / this.timeStep);

		// Updating cells
		for (let i = 0; i < slotLength; i++) {
			// Calculating date & dateID
			const date = h.date.addTime(
				new Date(s.attributes.start),
				this.timeStep * i
			);
			const dateID = date.toISOString();

			// Getting cell & updating
			const cell = this.cells[dateID];
			if (cell) {
				cell.type = s.attributes.type;
				cell.edited = false;
			} else {
				console.log('MissingCell', dateID);
			}
		}
	}

	addSlot(s: t.ToolSlotEntity): void {
		this.slots.push(s);
		this.renderSlot(s);
	}

	addSlots(a: Array<t.ToolSlotEntity>): void {
		a.forEach((s) => {
			this.addSlot(s);
		});
	}
}
