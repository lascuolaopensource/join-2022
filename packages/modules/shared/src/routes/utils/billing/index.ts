export { Owner } from "./owner";
export { Person } from "./person";
export { Company } from "./company";

export const Options = ["owner", "person", "company"] as const;
export type Option = typeof Options[number];
