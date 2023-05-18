import { errors } from "join-shared";
import { compile } from "html-to-text";

//

export interface EmailTemplate {
    subject: string;
    text: string;
    html: string;
}

//

export async function sendTemplatedEmail(
    to: string,
    template: EmailTemplate,
    templateArgs: Object
) {
    try {
        await strapi.plugins["email"].services.email.sendTemplatedEmail(
            { to },
            template,
            templateArgs
        );
    } catch (e) {
        console.log(e);
        throw new Error(errors.emailSendError);
    }
}

//

export const HTMLtoText = compile({
    preserveNewlines: true,
});

// Separator for emails

export const s = "<p>---<p>";
