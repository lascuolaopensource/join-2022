// import { EmailTemplate } from "../../types";
// import { HTMLTemplateToText } from "../../utils";

// /**
//  * Pieces
//  */

// const subject = `Join | <%= COURSE_TITLE %> | Iscrizione approvata! :)`;

// const html = `<p>Ciao, <%= USER_NAME %>!</p>

//     <p>Ti confermiamo che il corso <%= COURSE_TITLE %> è partito, e che sei stato selezionato!<br>
//     A presto verrai contattato dal team della didattica per ulteriori dettagli :)</p>

//     <p>Grazie e a presto,<br>
//     La Scuola Open Source</p>
// `;

// /**
//  * Email templates arguments interfaces
//  */

// export interface AdminEnrollmentsApprovedEmailTemplateArgs {
//     COURSE_TITLE: string;
//     USER_NAME: string;
// }

// /**
//  * Email template
//  */

// export const adminEnrollmentsApprovedEmailTemplate: EmailTemplate = {
//     subject,
//     html,
//     text: HTMLTemplateToText(html),
// };
