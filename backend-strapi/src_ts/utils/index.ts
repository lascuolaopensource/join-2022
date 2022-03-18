import { t } from "shared";
import crypto from "crypto";

const urlJoin = require("url-join");
const { getAbsoluteServerUrl } = require("@strapi/utils");

//

export * from "./email";
export { registerUser, RegisterUserInput } from "./registerUser";

//

export const entities = {
    course: "api::course.course",
    user: "plugin::users-permissions.user",
    userInfo: "api::user-info.user-info",
};

export async function getCourseByID(id: string | number, options = {}) {
    const course: t.ID<t.Course> = await strapi.entityService.findOne(
        entities.course,
        id,
        options
    );
    return course;
}

export async function getUserByEmail(email: string) {
    const user: t.ID<t.UsersPermissionsUser> = await strapi
        .query(entities.user)
        .findOne({ where: { email } });
    return user;
}

export function generateSecureString(length: number): string {
    return crypto.randomBytes(length).toString("hex");
}

export async function getUserPemissionsSettings() {
    // Copied from node_modules/@strapi/plugin-users-permissions/server/controllers/auth.js
    const pluginStore = await strapi.store({
        type: "plugin",
        name: "users-permissions",
    });
    const settings = await pluginStore.get({
        key: "advanced",
    });

    return settings as {
        allow_register: boolean;
        email_confirmation: boolean;
        default_role: any;
    };
}

export function getService(name: string) {
    return strapi.plugin("users-permissions").service(name);
}

/**
 *
 */

export function createConfirmationTokenURL() {
    // Creating verification token
    const token = crypto.randomBytes(20).toString("hex");

    // Building the verification url
    const apiPrefix = strapi.config.get("api.rest.prefix");
    const url = urlJoin(
        getAbsoluteServerUrl(strapi.config),
        apiPrefix,
        `/auth/email-confirmation?confirmation=${token}`
    );

    return {
        token,
        url,
    };
}
