export type ToolNeedsDay = {
	id: number;
	tools: Array<string>;
	hours: number;
};

export type BookToolsCheckAvailabilityReq = {
	days: Array<ToolNeedsDay>;
	start: string;
};

export enum DayResKind {
	Single = "single",
	Multiple = "multiple",
}

export type DayRes<K, T> = {
	kind: K;
	data: T;
};

export type SingleDayResData = Array<[string, string]>;
export interface SingleDayRes
	extends DayRes<DayResKind.Single, SingleDayResData> {}

export type MultipleDayResData = Array<Array<Array<[string, string]>>>;
export interface MultipleDayRes
	extends DayRes<DayResKind.Multiple, MultipleDayResData> {}

export type BookToolsCheckAvailabilityRes = SingleDayRes | MultipleDayRes;
