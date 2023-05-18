import { HTMLtoText, sendTemplatedEmail } from "../../../utils";

// Text content

const subject = `SOS | <%= COURSE_NAME %> | Conferma iscrizione`;

const html = `<p>Ciao!<br>
Grazie per esserti iscritto al corso <%= COURSE_NAME %>.</p>

<p>Ti notificheremo appena il corso verrà confermato.</p>

<p>A presto,<br>
La Scuola Open Source</p>`;

//

export namespace EnrollConfirmEmail {
    // Email arguments
    export interface Args {
        COURSE_NAME: string;
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
