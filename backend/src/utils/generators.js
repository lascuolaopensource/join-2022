"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateConfirmationTokenURL = exports.generateSecureString = void 0;
const crypto_1 = __importDefault(require("crypto"));
const urlJoin = require("url-join");
const { getAbsoluteServerUrl } = require("@strapi/utils");
function generateSecureString(length) {
    return crypto_1.default.randomBytes(length).toString("hex");
}
exports.generateSecureString = generateSecureString;
function generateConfirmationTokenURL() {
    const token = generateSecureString(20);
    const apiPrefix = strapi.config.get("api.rest.prefix");
    const url = urlJoin(getAbsoluteServerUrl(strapi.config), apiPrefix, `/auth/email-confirmation?confirmation=${token}`);
    return {
        token,
        url,
    };
}
exports.generateConfirmationTokenURL = generateConfirmationTokenURL;
