import { types as t } from "join-shared";
import { entities } from "./entities";

export async function getUserByEmail(email: string) {
    const user: Array<t.ID<t.UsersPermissionsUser>> =
        await strapi.entityService.findMany(entities.user, {
            filters: {
                email,
            },
        });
    return user;
}
