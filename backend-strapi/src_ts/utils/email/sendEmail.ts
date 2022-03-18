/**
 * Main
 */

export interface IEmailTemplate {
    subject: string;
    text: string;
    html: string;
}

export async function sendTemplatedEmail(
    to: string,
    template: IEmailTemplate,
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
        throw new Error("emailSendError");
    }
}

/**
 * Utils
 */

export function HTMLTemplateToText(s: string): string {
    // Listing tokens to replace
    const toReplace: Array<[string, string]> = [
        ["<br>", " "],
        ["<p>", ""],
        ["</p>", " "],
        ["<strong>", ""],
        ["</strong>", ""],
    ];

    // Iterating over list
    let cleanString = s;
    for (let r of toReplace) {
        cleanString = cleanString.replace(r[0], r[1]);
    }

    return cleanString;
}

// Separator for emails
export const s = "<p>---<p>";
