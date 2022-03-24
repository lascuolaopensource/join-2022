"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentOwner = exports.getUserInfo = exports.getPaymentDetails = exports.getPaymentBillingInfo = exports.getPaymentByHash = exports.getPaymentHash = exports.createConfirmationTokenURL = exports.getService = exports.getUserPemissionsSettings = exports.generateSecureString = exports.getUserByEmail = exports.getCourseByID = exports.entities = void 0;
const shared_1 = require("shared");
const crypto_1 = __importDefault(require("crypto"));
const urlJoin = require("url-join");
const { getAbsoluteServerUrl } = require("@strapi/utils");
exports.entities = {
    course: "api::course.course",
    user: "plugin::users-permissions.user",
    userInfo: "api::user-info.user-info",
    payment: "api::payment.payment",
    billingInfo: "api::billing-info.billing-info",
    enrollment: "api::enrollment.enrollment",
};
async function getCourseByID(id, options = {}) {
    const course = await strapi.entityService.findOne(exports.entities.course, id, options);
    return course;
}
exports.getCourseByID = getCourseByID;
async function getUserByEmail(email) {
    const user = await strapi
        .query(exports.entities.user)
        .findOne({ where: { email } });
    return user;
}
exports.getUserByEmail = getUserByEmail;
function generateSecureString(length) {
    return crypto_1.default.randomBytes(length).toString("hex");
}
exports.generateSecureString = generateSecureString;
async function getUserPemissionsSettings() {
    const pluginStore = await strapi.store({
        type: "plugin",
        name: "users-permissions",
    });
    const settings = await pluginStore.get({
        key: "advanced",
    });
    return settings;
}
exports.getUserPemissionsSettings = getUserPemissionsSettings;
function getService(name) {
    return strapi.plugin("users-permissions").service(name);
}
exports.getService = getService;
function createConfirmationTokenURL() {
    const token = crypto_1.default.randomBytes(20).toString("hex");
    const apiPrefix = strapi.config.get("api.rest.prefix");
    const url = urlJoin(getAbsoluteServerUrl(strapi.config), apiPrefix, `/auth/email-confirmation?confirmation=${token}`);
    return {
        token,
        url,
    };
}
exports.createConfirmationTokenURL = createConfirmationTokenURL;
function getPaymentHash(ctx) {
    const hash = ctx.request?.body?.hash || ctx.params?.hash || null;
    if (!hash) {
        throw new Error("hashNotFound");
    }
    return hash;
}
exports.getPaymentHash = getPaymentHash;
async function getPaymentByHash(hash) {
    return await strapi.query(exports.entities.payment).findOne({ where: { hash } });
}
exports.getPaymentByHash = getPaymentByHash;
async function getPaymentBillingInfo(paymentID) {
    const payment = await strapi.entityService.findOne(exports.entities.payment, paymentID, {
        populate: {
            billing: {
                populate: ["data", "address"],
            },
        },
    });
    if (!payment) {
        throw new Error("paymentNotFound");
    }
    const billingInfo = payment.billing;
    if (billingInfo) {
        return {
            address: billingInfo.address,
            data: billingInfo.data[0],
        };
    }
    else {
        return null;
    }
}
exports.getPaymentBillingInfo = getPaymentBillingInfo;
async function getPaymentDetails(paymentID) {
    const payment = await strapi.entityService.findOne(exports.entities.payment, paymentID, {
        populate: {
            enrollment: {
                populate: {
                    course: {
                        fields: ["title", "price"],
                    },
                },
            },
        },
    });
    if (!payment) {
        throw new Error("paymentNotFound");
    }
    const enrollment = payment.enrollment;
    const course = enrollment.course;
    const details = {
        category: shared_1.t.PaymentCategories.course,
        title: course.title,
        price: course.price,
    };
    return details;
}
exports.getPaymentDetails = getPaymentDetails;
async function getUserInfo(userID) {
    const user = await strapi.entityService.findOne(exports.entities.user, userID, {
        populate: {
            userInfo: true,
        },
    });
    if (!user) {
        throw new Error("userNotFound");
    }
    const userInfo = user.userInfo;
    return userInfo;
}
exports.getUserInfo = getUserInfo;
async function getPaymentOwner(paymentID) {
    const payment = await strapi.entityService.findOne(exports.entities.payment, paymentID, {
        populate: {
            owner: true,
        },
    });
    if (!payment) {
        throw new Error("paymentNotFound");
    }
    const owner = payment.owner;
    return owner;
}
exports.getPaymentOwner = getPaymentOwner;
