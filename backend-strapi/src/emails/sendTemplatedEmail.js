"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTemplatedEmail = void 0;
async function sendTemplatedEmail(to, template, templateArgs) {
    try {
        await strapi.plugins["email"].services.email.sendTemplatedEmail({ to }, template, templateArgs);
    }
    catch (e) {
        console.log(e);
        throw new Error("emailSendError");
    }
}
exports.sendTemplatedEmail = sendTemplatedEmail;
