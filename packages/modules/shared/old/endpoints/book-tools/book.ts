export type DayReq = {
	tool_ids: Array<string>;
	start: string;
	end: string;
};

export type BookToolsReq = {
	days: Array<DayReq>;
};
