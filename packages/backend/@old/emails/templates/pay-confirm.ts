import { EmailTemplate } from "../types";
import { HTMLTemplateToText } from "../utils";

/**
 * Pieces
 */

const subject = `Join | Conferma di pagamento`;

const html = `<p>Ciao, <%= USER_NAME %>!</p>

    <p>Ti confermiamo che abbiamo ricevuto il tuo pagamento!</p>

    <p><strong>Oggetto:</strong> <%= PAYMENT.CATEGORY %> – <%= PAYMENT.TITLE %><br>
    <strong>Importo:</strong> <%= PAYMENT.PRICE %></p>

    <p>Per qualsiasi problema non esitare a contattarci!</p>

    <p>Grazie e a presto,<br>
    La Scuola Open Source</p>
`;

/**
 * Email templates arguments interfaces
 */

export interface PayConfirmEmailTemplateArgs {
    USER_NAME: string;
    PAYMENT: {
        CATEGORY: string;
        TITLE: string;
        PRICE: string;
    };
}

/**
 * Email template
 */

export const payConfirmEmailTemplate: EmailTemplate = {
    subject,
    html,
    text: HTMLTemplateToText(html),
};
