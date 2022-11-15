"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollAccountEmail = void 0;
const utils_1 = require("../../../utils");
// Text content
const subject = `SOS | <%= COURSE_NAME %> | Creazione account`;
const html = `<p>Ciao!<br>
Grazie per esserti iscritto al corso <%= COURSE_NAME %>.</p>

<p>Per facilitare alcune questioni gestionali abbiamo creato in automatico un account sul nostro gestionale: dovrebbe esserti arrivata una mail di conferma.</p>

<p>Se non sei interessato, l'account verrà eliminato automaticamente al termine del corso.</p>

<p>Se invece vuoi esplorare il nostro universo, puoi attivare il tuo account:<br>
- Clicca nel link contenuto nella precedente mail di conferma<br>
- Esegui il login con questa password temporanea: <%= PASSWORD %><br>
- Cambia la password appena esegui il login</p>

<p>A presto,<br>
La Scuola Open Source</p>`;
//
var EnrollAccountEmail;
(function (EnrollAccountEmail) {
    // Sender function
    async function send(to, args) {
        await (0, utils_1.sendTemplatedEmail)(to, {
            subject,
            html,
            text: (0, utils_1.HTMLtoText)(html),
        }, args);
    }
    EnrollAccountEmail.send = send;
})(EnrollAccountEmail = exports.EnrollAccountEmail || (exports.EnrollAccountEmail = {}));
