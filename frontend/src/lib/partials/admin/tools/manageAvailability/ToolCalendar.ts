import { ToolCalendarCell } from './ToolCalendarCell';
import { helpers as h, types as t } from 'shared';

//

const dayLengthMS = 24 * 60 * 60 * 1000;

//

export class ToolCalendar {
	toolID: string;
	cells: Array<ToolCalendarCell>;

	constructor(toolID: string, dates: Array<Date>, timeStep: number) {
		this.toolID = toolID;
		this.cells = [];

		this.setupCells(dates, timeStep);
	}

	// Setup

	setupCells(dates: Array<Date>, timeStep: number): void {
		const iterations = dayLengthMS / timeStep;
		for (let d of dates) {
			for (let i = 0; i < iterations; i++) {
				const start = h.date.addTime(d, timeStep * i);
				const end = h.date.addTime(start, timeStep);
				this.cells.push(new ToolCalendarCell(start, end));
			}
		}
	}

	// Edits management

	getEdits(): Array<ToolCalendarCell> {
		const edits: Array<ToolCalendarCell> = [];
		for (let c of this.cells) {
			if (c.edited) edits.push(c);
		}
		return edits;
	}

	resetEdits() {
		for (let c of this.cells) {
			c.reset();
		}
	}

	editsExist(): boolean {
		return this.getEdits().length >= 1;
	}

	// Getters

	getCellByStartDate(d: Date): ToolCalendarCell {
		const candidates = this.cells.filter(
			(c) => c.start.getTime() == d.getTime()
		);
		if (candidates.length == 1) {
			return candidates[0];
		} else {
			throw new Error('multipleCellsSameDate');
		}
	}
}
