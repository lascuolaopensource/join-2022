"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s = exports.HTMLtoText = exports.sendTemplatedEmail = void 0;
const join_shared_1 = require("join-shared");
const html_to_text_1 = require("html-to-text");
//
async function sendTemplatedEmail(to, template, templateArgs) {
    try {
        await strapi.plugins["email"].services.email.sendTemplatedEmail({ to }, template, templateArgs);
    }
    catch (e) {
        console.log(e);
        throw new Error(join_shared_1.errors.emailSendError);
    }
}
exports.sendTemplatedEmail = sendTemplatedEmail;
//
exports.HTMLtoText = (0, html_to_text_1.compile)({
    preserveNewlines: true,
});
// Separator for emails
exports.s = "<p>---<p>";
