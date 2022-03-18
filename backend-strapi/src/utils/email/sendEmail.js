"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s = exports.HTMLTemplateToText = exports.sendTemplatedEmail = void 0;
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
function HTMLTemplateToText(s) {
    const toReplace = [
        ["<br>", " "],
        ["<p>", ""],
        ["</p>", " "],
        ["<strong>", ""],
        ["</strong>", ""],
    ];
    let cleanString = s;
    for (let r of toReplace) {
        cleanString = cleanString.replace(r[0], r[1]);
    }
    return cleanString;
}
exports.HTMLTemplateToText = HTMLTemplateToText;
exports.s = "<p>---<p>";
