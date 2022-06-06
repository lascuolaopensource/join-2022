import { types as t } from 'shared';

export class ToolCalendarCell {
	start: Date;
	end: Date;
	type: t.Enum_Toolslot_Type | null;
	edited: boolean;

	constructor(start: Date, end: Date) {
		this.start = start;
		this.end = end;
		this.type = null;
		this.edited = false;
	}

	reset(): void {
		if (this.edited) {
			this.edited = false;
			this.type = this.type == null ? t.Enum_Toolslot_Type.Availability : null;
		}
	}
}
