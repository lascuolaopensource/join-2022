import { types as t } from 'shared';

export class ToolCalendarCell {
	type: t.Enum_Toolslot_Type | null;
	edited: boolean;

	constructor(start: Date) {
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
