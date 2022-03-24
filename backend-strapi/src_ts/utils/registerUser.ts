import { getUserPemissionsSettings, getService } from "./index";
import type { t } from "shared";
import { entities } from "./mixed";

const utils = require("@strapi/utils");
const { yup } = utils;
const { ApplicationError } = utils.errors;

/**
 * Utils
 */

const emailRegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const registerUserSchema = yup.object({
    email: yup.string().email().matches(emailRegExp).required(),
    name: yup.string().required(),
    surname: yup.string().required(),
    password: yup.string().required(),
    confirmationToken: yup.string(),
});

export type RegisterUserInput = t.UsersPermissionsUserInput & t.UserInfoInput;

/**
 *
 */

export async function registerUser(
    data: RegisterUserInput
): Promise<t.ID<t.UsersPermissionsUser>> {
    strapi.log.info("In registerUser function");

    // Getting user-permissions settings
    const settings = await getUserPemissionsSettings();

    /**
     * Validating data
     */
    try {
        await registerUserSchema.validate(data);
    } catch (e) {
        throw new ApplicationError("validationFailed");
    }

    // Throw an error if the password selected by the user
    // contains more than three times the symbol '$'.
    if (getService("user").isHashed(data.password)) {
        throw new ApplicationError("passwordThreeDollars");
    }

    /**
     * Creating user params
     */

    // PROVIDER: Adding 'local' provider if not specified
    if (!data.provider) {
        data.provider = "local";
    }

    // EMAIL: Making email lowercase
    data.email = data.email?.toLowerCase();

    // USERNAME: Adding username
    if (!data.username) {
        data.username = data.email;
    }

    // CONFIRMED: L'utente è già confermato se l'email di conferma non è attiva
    if (!settings.email_confirmation) {
        data.confirmed = true;
    }

    // ROLE: Adding role
    const role = await strapi
        .query("plugin::users-permissions.role")
        .findOne({ where: { type: settings.default_role } });

    if (!role) {
        throw new ApplicationError("Impossible to find the default role");
    }

    data.role = role.id;

    /**
     * Si verifica che non ci siano utenti già esistenti
     */

    const existingUser: t.ID<t.UsersPermissionsUser> = await strapi
        .query(entities.user)
        .findOne({
            where: { email: data.email },
        });

    if (existingUser && existingUser.provider === data.provider) {
        throw new ApplicationError("emailTaken");
    }

    if (
        existingUser &&
        existingUser.provider !== data.provider &&
        settings.unique_email
    ) {
        throw new ApplicationError("emailTaken");
    }

    /**
     * Creating user
     */

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
