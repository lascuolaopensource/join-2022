import { HTMLtoText, sendTemplatedEmail } from "../../../utils";

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

export namespace PayConfirmEmail {
    // Arguments
    export interface Args {
        USER_NAME: string;
        PAYMENT: {
            CATEGORY: string;
            TITLE: string;
            PRICE: string;
        };
    }

    // Sender function
    export async function send(to: string, args: Args) {
        await sendTemplatedEmail(
            to,
            {
                subject,
                html,
                text: HTMLtoText(html),
            },
            args
        );
    }
}
