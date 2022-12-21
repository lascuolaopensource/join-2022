import { Request } from "$request";
import { UsersPermissionsMe, UserInfo, UsersPermissionsRole, ID } from "../../types";
export declare const path = "/users/me?populate=info&populate=role";
export declare const method = Request.HTTPMethod.GET;
export declare type Res = (ID<UsersPermissionsMe> & {
    info: ID<UserInfo>;
} & {
    role: ID<UsersPermissionsRole>;
}) | undefined;
export declare function send(token: string, fetchImpl?: typeof fetch): Promise<import("$join-request").Res<UsersPermissionsMe & {
    id: string;
} & {
    info: ID<UserInfo>;
} & {
    role: ID<UsersPermissionsRole>;
}>>;
