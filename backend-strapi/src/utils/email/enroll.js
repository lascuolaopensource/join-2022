"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrollTemplate = void 0;
const sendEmail_1 = require("./sendEmail");
const subject = `Join | <%= COURSE_TITLE %> | Iscrizione ricevuta! :)`;
const intro = `<p>Ciao, <%= USER_NAME %>!</p>
    <p>Abbiamo ricevuto la tua domanda di iscrizione al corso!<br>
    Alla scadenza della deadline ti confermeremo se il corso è effettivamente partito.</p>
`;
const payment = `<p><strong>Pagamento</strong><br>
    Questo è il link per il pagamento, te lo inviamo nel caso volessi completare il pagamento in un secondo momento.<br>
    <%= PAYMENT_URL %><br>
    Ti chiediamo di pagare in anticipo per questioni gestionali.<br>
    Ti verranno immediatamente restituiti i soldi se il corso non dovesse partire.</p>
`;
const userCreation = `<p><strong>Creazione account</strong></p>
    Contestualmente all'iscrizione è stato creato te per un account su Join: ci serve per facilitare alcune questioni gestionali.<br>
    Se non sei interessato, non ti preoccupare: l'account verrà eliminato automaticamente al termine del corso.<br>
    Se invece il servizio ti può interessare qui trovi i dati di accesso.</p> 
`;
const userConfirmation = `<p>Prima di tutto, conferma la tua email cliccando su questo link:<br>
    <%= USER_ACCOUNT.CONFIRMATION_URL %></p>
`;
const userData = `<p>Accedi al portale con i seguenti dati:<br>
    EMAIL: <%= USER_ACCOUNT.EMAIL %><br>
    PSW: <%= USER_ACCOUNT.PASSWORD %></p>
`;
const end = `<p>Grazie per il tuo supporto!</p>
    <p>A presto,<br>
    La Scuola Open Source</p>
`;
const enrollTemplate = (args) => {
    let html = intro;
    if (args.PAYMENT_URL) {
        html += sendEmail_1.s;
        html += payment;
    }
    if (args.USER_ACCOUNT) {
        html += sendEmail_1.s;
        html += userCreation;
        if (args.USER_ACCOUNT.CONFIRMATION_URL) {
            html += userConfirmation;
        }
        html += userData;
    }
    html += sendEmail_1.s;
    html += end;
    const text = (0, sendEmail_1.HTMLTemplateToText)(html);
    return {
        subject,
        html,
        text,
    };
};
exports.enrollTemplate = enrollTemplate;
