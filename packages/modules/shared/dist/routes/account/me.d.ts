import { Request } from "$request";
import { UsersPermissionsMe, UserInfo } from "../../types";
export declare const path = "/users/me?populate=info";
export declare const method = Request.HTTPMethod.GET;
export declare type Res = (UsersPermissionsMe & {
    info: UserInfo;
}) | undefined;
export declare function send(token: string, fetchImpl?: typeof fetch): Promise<import("$join-request").Res<UsersPermissionsMe & {
    info: UserInfo;
}>>;
