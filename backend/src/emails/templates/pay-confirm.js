"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payConfirmEmailTemplate = void 0;
const utils_1 = require("../utils");
const subject = `Join | Conferma di pagamento`;
const html = `<p>Ciao, <%= USER_NAME %>!</p>

    <p>Ti confermiamo che abbiamo ricevuto il tuo pagamento!</p>

    <p><strong>Oggetto:</strong> <%= PAYMENT.CATEGORY %> – <%= PAYMENT.TITLE %><br>
    <strong>Importo:</strong> <%= PAYMENT.PRICE %></p>

    <p>Per qualsiasi problema non esitare a contattarci!</p>

    <p>Grazie e a presto,<br>
    La Scuola Open Source</p>
`;
exports.payConfirmEmailTemplate = {
    subject,
    html,
    text: (0, utils_1.HTMLTemplateToText)(html),
};
