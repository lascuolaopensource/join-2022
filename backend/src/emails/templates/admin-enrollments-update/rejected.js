"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminEnrollmentsRejectedEmailTemplate = void 0;
const utils_1 = require("../../utils");
const subject = `Join | <%= COURSE_TITLE %> | Iscrizione rifiutata`;
const html = `<p>Ciao, <%= USER_NAME %>!</p>

    <p>Purtroppo non sei stato selezionato per il corso :(</p>

    <p>Grazie e a presto,<br>
    La Scuola Open Source</p>
`;
exports.adminEnrollmentsRejectedEmailTemplate = {
    subject,
    html,
    text: (0, utils_1.HTMLTemplateToText)(html),
};
