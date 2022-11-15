"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollPaymentEmail = void 0;
const utils_1 = require("../../../utils");
// Text content
const subject = `SOS | <%= COURSE_NAME %> | Pagamento`;
const html = `<p>Ciao!<br>
Grazie per esserti iscritto al corso <%= COURSE_NAME %>.</p>

<p>Se hai già effettuato il pagamento, ignora questa email.</p>

<p>Se non l'hai ancora effettuato, questa mail serve per conservare il tuo link al pagamento.<br>
<%= PAYMENT.URL %></p>

<p>La data di scadenza per il pagamento è il <strong><%= PAYMENT.DEADLINE %></strong></p>

<p>Ti chiediamo di pagare in anticipo per questioni gestionali.<br>
Ti verranno immediatamente restituiti i soldi se il corso non dovesse partire.</p>

<p>A presto,<br>
La Scuola Open Source</p>`;
//
var EnrollPaymentEmail;
(function (EnrollPaymentEmail) {
    // Sender function
    async function send(to, args) {
        await (0, utils_1.sendTemplatedEmail)(to, {
            subject,
            html,
            text: (0, utils_1.HTMLtoText)(html),
        }, args);
    }
    EnrollPaymentEmail.send = send;
})(EnrollPaymentEmail = exports.EnrollPaymentEmail || (exports.EnrollPaymentEmail = {}));
