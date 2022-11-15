import { Errors, types as t } from "shared";
import { getUserPemissionsSettings, getService } from "./getters";
import { entities } from "./entities";

const utils = require("@strapi/utils");
const { yup } = utils;

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
        throw new Error(Errors.ValidationError);
    }

    // Throw an error if the password selected by the user
    // contains more than three times the symbol '$'.
    if (getService("user").isHashed(data.password)) {
        throw new Error(Errors.PasswordThreeDollars);
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
        throw new Error(Errors.DefaultRoleNotFound);
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
        throw new Error(Errors.EmailTaken);
    }

    if (
        existingUser &&
        existingUser.provider !== data.provider &&
        settings.unique_email
    ) {
        throw new Error(Errors.EmailTaken);
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
        entities.userInfo,
        { data: newUserInfoData }
    );

    /**
     * Returning
     */

    return user;
}

export function registerUserErrorHandler(e: any, ctx: any) {
    if (e instanceof Error) {
        const msg = (e as Error).message;
        switch (msg) {
            case Errors.ValidationError:
            case Errors.PasswordThreeDollars:
                return ctx.badRequest(msg);
            case Errors.DefaultRoleNotFound:
                return ctx.internalServerError(msg);
            case Errors.EmailTaken:
                return ctx.conflict(msg);
        }
    } else {
        console.log(e);
        return ctx.internalServerError(Errors.UnknownError);
    }
}
