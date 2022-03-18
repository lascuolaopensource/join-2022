import { getUserPemissionsSettings, getService } from "./index";
import type { t } from "shared";

const utils = require("@strapi/utils");
const { ApplicationError } = utils.errors;

//

export type RegisterUserInput = t.UsersPermissionsUserInput & t.UserInfoInput;

export async function registerUser(
    data: RegisterUserInput
): Promise<t.ID<t.UsersPermissionsUser>> {
    strapi.log.info("In registerUser function");

    // Getting user-permissions settings
    const settings = await getUserPemissionsSettings();

    /**
     * Creating user params
     */

    // Adding 'local' provider if not specified
    if (!data.provider) {
        data.provider = "local";
    }

    // Making email lowercase
    data.email = data.email?.toLowerCase();

    // Adding username
    if (!data.username) {
        data.username = data.email;
    }

    // Adding role
    const role = await strapi
        .query("plugin::users-permissions.role")
        .findOne({ where: { type: settings.default_role } });

    if (!role) {
        throw new ApplicationError("Impossible to find the default role");
    }

    data.role = role.id;

    /**
     * Creating user
     */

    // L'utente è già confermato se l'email di conferma non è attiva
    if (!settings.email_confirmation) {
        data.confirmed = true;
    }

    // Creating user
    const user = await getService("user").add(data);

    /**
     * Creating userInfo
     */

    const newUserInfoData: t.UserInfoInput = {
        name: data.name,
        surname: data.surname,
        owner: user.id,
    };

    const newUserInfo: t.UserInfo = await strapi.entityService.create(
        "api::user-info.user-info",
        { data: newUserInfoData }
    );

    /**
     * Returning
     */

    return user;
}
