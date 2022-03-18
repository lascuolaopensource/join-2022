"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const index_1 = require("./index");
const utils = require("@strapi/utils");
const { ApplicationError } = utils.errors;
async function registerUser(data) {
    strapi.log.info("In registerUser function");
    const settings = await (0, index_1.getUserPemissionsSettings)();
    if (!data.provider) {
        data.provider = "local";
    }
    data.email = data.email?.toLowerCase();
    if (!data.username) {
        data.username = data.email;
    }
    const role = await strapi
        .query("plugin::users-permissions.role")
        .findOne({ where: { type: settings.default_role } });
    if (!role) {
        throw new ApplicationError("Impossible to find the default role");
    }
    data.role = role.id;
    if (!settings.email_confirmation) {
        data.confirmed = true;
    }
    const user = await (0, index_1.getService)("user").add(data);
    const newUserInfoData = {
        name: data.name,
        surname: data.surname,
        owner: user.id,
    };
    const newUserInfo = await strapi.entityService.create("api::user-info.user-info", { data: newUserInfoData });
    return user;
}
exports.registerUser = registerUser;
