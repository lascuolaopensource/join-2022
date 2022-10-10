import { HTMLtoText, sendTemplatedEmail } from "../../../utils";

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

export namespace EnrollPaymentEmail {
    // Email arguments
    export interface Args {
        COURSE_NAME: string;
        PAYMENT: {
            URL: string;
            DEADLINE: string;
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
