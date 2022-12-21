import { send as s } from "$join-request";
import { Request } from "$request";
import {
    UsersPermissionsMe,
    UserInfo,
    UsersPermissionsRole,
    ID,
} from "../../types";

export const path = "/users/me?populate=info&populate=role";
export const method = Request.HTTPMethod.GET;

export type Res =
    | (ID<UsersPermissionsMe> & { info: ID<UserInfo> } & {
          role: ID<UsersPermissionsRole>;
      })
    | undefined;

export async function send(token: string, fetchImpl = fetch) {
    return s<Res>({
        path,
        method,
        auth: token,
        fetchImpl,
    });
}
