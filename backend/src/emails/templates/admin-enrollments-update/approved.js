"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminEnrollmentsApprovedEmailTemplate = void 0;
const utils_1 = require("../../utils");
const subject = `Join | <%= COURSE_TITLE %> | Iscrizione approvata! :)`;
const html = `<p>Ciao, <%= USER_NAME %>!</p>

    <p>Ti confermiamo che il corso <%= COURSE_TITLE %> è partito, e che sei stato selezionato!<br>
    A presto verrai contattato dal team della didattica per ulteriori dettagli :)</p>

    <p>Grazie e a presto,<br>
    La Scuola Open Source</p>
`;
exports.adminEnrollmentsApprovedEmailTemplate = {
    subject,
    html,
    text: (0, utils_1.HTMLTemplateToText)(html),
};
