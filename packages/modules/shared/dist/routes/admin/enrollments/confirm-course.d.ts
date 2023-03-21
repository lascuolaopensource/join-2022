import { HTTPMethod } from "../../../types";
export declare const method = HTTPMethod.GET;
export declare type Params = {
    id: string;
};
export declare const defaultParams: Params;
export declare function path(params?: Params): string;
export interface Res {
}
export declare function send(courseID: string, auth: string, fetchImpl?: typeof fetch): Promise<import("../../../join-request").Res<Res>>;
