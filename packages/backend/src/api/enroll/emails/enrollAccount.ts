import { HTMLtoText, sendTemplatedEmail } from "../../../utils";

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

export namespace EnrollAccountEmail {
    // Email arguments
    export interface Args {
        COURSE_NAME: string;
        PASSWORD: string;
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
