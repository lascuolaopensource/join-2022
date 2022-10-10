"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollConfirmEmail = void 0;
const utils_1 = require("../../../utils");
// Text content
const subject = `SOS | <%= COURSE_NAME %> | Conferma iscrizione`;
const html = `<p>Ciao!<br>
Grazie per esserti iscritto al corso <%= COURSE_NAME %>.</p>

<p>Ti notificheremo appena il corso verrà confermato.</p>

<p>A presto,<br>
La Scuola Open Source</p>`;
//
var EnrollConfirmEmail;
(function (EnrollConfirmEmail) {
    // Sender function
    async function send(to, args) {
        await (0, utils_1.sendTemplatedEmail)(to, {
            subject,
            html,
            text: (0, utils_1.HTMLtoText)(html),
        }, args);
    }
    EnrollConfirmEmail.send = send;
})(EnrollConfirmEmail = exports.EnrollConfirmEmail || (exports.EnrollConfirmEmail = {}));
