import { send as s, Res as R } from "$join-request";
import { Request } from "$request";
import { UsersPermissionsMe, UserInfo } from "../../types";

export const path = "/users/me?populate=info";
export const method = Request.HTTPMethod.GET;

export type Res = (UsersPermissionsMe & { info: UserInfo }) | undefined;

export async function send(token: string, fetchImpl = fetch): Promise<R<Res>> {
    return s<Res>({
        path,
        method,
        auth: token,
        fetchImpl,
    });
}
