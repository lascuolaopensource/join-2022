"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserErrorHandler = exports.registerUser = void 0;
const shared_1 = require("shared");
const getters_1 = require("./getters");
const entities_1 = require("./entities");
const utils = require("@strapi/utils");
const { yup } = utils;
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
    const settings = await (0, getters_1.getUserPemissionsSettings)();
    try {
        await registerUserSchema.validate(data);
    }
    catch (e) {
        throw new Error(shared_1.Errors.ValidationError);
    }
    if ((0, getters_1.getService)("user").isHashed(data.password)) {
        throw new Error(shared_1.Errors.PasswordThreeDollars);
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
        throw new Error(shared_1.Errors.DefaultRoleNotFound);
    }
    data.role = role.id;
    const existingUser = await strapi
        .query(entities_1.entities.user)
        .findOne({
        where: { email: data.email },
    });
    if (existingUser && existingUser.provider === data.provider) {
        throw new Error(shared_1.Errors.EmailTaken);
    }
    if (existingUser &&
        existingUser.provider !== data.provider &&
        settings.unique_email) {
        throw new Error(shared_1.Errors.EmailTaken);
    }
    const user = await (0, getters_1.getService)("user").add(data);
    const newUserInfoData = {
        name: data.name,
        surname: data.surname,
        owner: user.id,
    };
    const newUserInfo = await strapi.entityService.create(entities_1.entities.userInfo, { data: newUserInfoData });
    return user;
}
exports.registerUser = registerUser;
function registerUserErrorHandler(e, ctx) {
    if (e instanceof Error) {
        const msg = e.message;
        switch (msg) {
            case shared_1.Errors.ValidationError:
            case shared_1.Errors.PasswordThreeDollars:
                return ctx.badRequest(msg);
            case shared_1.Errors.DefaultRoleNotFound:
                return ctx.internalServerError(msg);
            case shared_1.Errors.EmailTaken:
                return ctx.conflict(msg);
        }
    }
    else {
        console.log(e);
        return ctx.internalServerError(shared_1.Errors.UnknownError);
    }
}
exports.registerUserErrorHandler = registerUserErrorHandler;
