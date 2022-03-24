"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const index_1 = require("./index");
const mixed_1 = require("./mixed");
const utils = require("@strapi/utils");
const { yup } = utils;
const { ApplicationError } = utils.errors;
const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const registerUserSchema = yup.object({
    email: yup.string().email().matches(emailRegExp).required(),
    name: yup.string().required(),
    surname: yup.string().required(),
    password: yup.string().required(),
    confirmationToken: yup.string(),
});
async function registerUser(data) {
    strapi.log.info("In registerUser function");
    const settings = await (0, index_1.getUserPemissionsSettings)();
    try {
        await registerUserSchema.validate(data);
    }
    catch (e) {
        throw new ApplicationError("validationFailed");
    }
    if ((0, index_1.getService)("user").isHashed(data.password)) {
        throw new ApplicationError("passwordThreeDollars");
    }
    if (!data.provider) {
        data.provider = "local";
    }
    data.email = data.email?.toLowerCase();
    if (!data.username) {
        data.username = data.email;
    }
    if (!settings.email_confirmation) {
        data.confirmed = true;
    }
    const role = await strapi
        .query("plugin::users-permissions.role")
        .findOne({ where: { type: settings.default_role } });
    if (!role) {
        throw new ApplicationError("Impossible to find the default role");
    }
    data.role = role.id;
    const existingUser = await strapi
        .query(mixed_1.entities.user)
        .findOne({
        where: { email: data.email },
    });
    if (existingUser && existingUser.provider === data.provider) {
        throw new ApplicationError("emailTaken");
    }
    if (existingUser &&
        existingUser.provider !== data.provider &&
        settings.unique_email) {
        throw new ApplicationError("emailTaken");
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
