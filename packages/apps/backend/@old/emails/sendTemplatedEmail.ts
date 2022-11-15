import { EmailTemplate } from "./types";
import { Errors } from "shared";

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
        throw new Error(Errors.EmailSendError);
    }
}
