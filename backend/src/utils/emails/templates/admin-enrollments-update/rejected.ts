// import { EmailTemplate } from "../../types";
// import { HTMLTemplateToText } from "../../utils";

// /**
//  * Pieces
//  */

// const subject = `Join | <%= COURSE_TITLE %> | Iscrizione rifiutata`;

// const html = `<p>Ciao, <%= USER_NAME %>!</p>

//     <p>Purtroppo non sei stato selezionato per il corso :(</p>

//     <p>Grazie e a presto,<br>
//     La Scuola Open Source</p>
// `;

// /**
//  * Email templates arguments interfaces
//  */

// export interface AdminEnrollmentsRejectedEmailTemplateArgs {
//     COURSE_TITLE: string;
//     USER_NAME: string;
// }

// /**
//  * Email template
//  */

// export const adminEnrollmentsRejectedEmailTemplate: EmailTemplate = {
//     subject,
//     html,
//     text: HTMLTemplateToText(html),
// };
