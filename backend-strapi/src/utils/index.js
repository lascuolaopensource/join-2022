"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentByHash = exports.createConfirmationTokenURL = exports.getService = exports.getUserPemissionsSettings = exports.generateSecureString = exports.getUserByEmail = exports.getCourseByID = exports.entities = exports.registerUser = void 0;
const crypto_1 = __importDefault(require("crypto"));
const urlJoin = require("url-join");
const { getAbsoluteServerUrl } = require("@strapi/utils");
__exportStar(require("./email"), exports);
var registerUser_1 = require("./registerUser");
Object.defineProperty(exports, "registerUser", { enumerable: true, get: function () { return registerUser_1.registerUser; } });
exports.entities = {
    course: "api::course.course",
    user: "plugin::users-permissions.user",
    userInfo: "api::user-info.user-info",
    payment: "api::payment.payment",
    billingInfo: "api::billing-info.billing-info",
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
async function getPaymentByHash(hash) {
    const payments = await strapi.entityService.findMany(exports.entities.payment, {
        filters: {
            hash: {
                $eq: hash,
            },
        },
        populate: {
            billing: {
                populate: ["data", "address"],
            },
            enrollment: {
                populate: {
                    course: {
                        fields: ["title", "price"],
                    },
                },
            },
        },
    });
    if (!payments.length) {
        throw new Error("paymentNotFound");
    }
    const payment = payments[0];
    const billing = payment.billing;
    const billingAddress = billing.address;
    const billingData = billing.data[0];
    const enrollment = payment.enrollment;
    const course = enrollment.course;
    const relation = {
        subject: course.title,
        price: course.price,
        type: "Corso",
    };
    return {
        payment,
        billing: {
            address: billingAddress,
            data: billingData,
        },
        relation,
    };
}
exports.getPaymentByHash = getPaymentByHash;
