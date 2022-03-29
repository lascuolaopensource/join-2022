"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTemplatedEmail = void 0;
const shared_1 = require("shared");
async function sendTemplatedEmail(to, template, templateArgs) {
    try {
        await strapi.plugins["email"].services.email.sendTemplatedEmail({ to }, template, templateArgs);
    }
    catch (e) {
        console.log(e);
        throw new Error(shared_1.Errors.EmailSendError);
    }
}
exports.sendTemplatedEmail = sendTemplatedEmail;
