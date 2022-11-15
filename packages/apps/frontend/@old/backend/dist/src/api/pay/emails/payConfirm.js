"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayConfirmEmail = void 0;
const utils_1 = require("../../../utils");
// Content
const subject = `Join | Conferma di pagamento`;
const html = `<p>Ciao, <%= USER_NAME %>!<br>
Ti confermiamo che abbiamo ricevuto il tuo pagamento!</p>

<p><strong>Oggetto:</strong> <%= PAYMENT.CATEGORY %> – <%= PAYMENT.TITLE %><br>
<strong>Importo:</strong> <%= PAYMENT.PRICE %></p>

<p>Per qualsiasi cosa non esitare a contattarci!</p>

<p>Grazie e a presto,<br>
La Scuola Open Source</p>
`;
//
var PayConfirmEmail;
(function (PayConfirmEmail) {
    // Sender function
    async function send(to, args) {
        await (0, utils_1.sendTemplatedEmail)(to, {
            subject,
            html,
            text: (0, utils_1.HTMLtoText)(html),
        }, args);
    }
    PayConfirmEmail.send = send;
})(PayConfirmEmail = exports.PayConfirmEmail || (exports.PayConfirmEmail = {}));
