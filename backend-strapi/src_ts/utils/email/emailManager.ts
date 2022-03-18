import { sendTemplatedEmail } from "./sendEmail";
import { enrollTemplate, IEnrollEmailTemplateArgs } from "./enroll";

export const emailManager = {
    //
    enroll: async (to: string, args: IEnrollEmailTemplateArgs) => {
        await sendTemplatedEmail(to, enrollTemplate(args), args);
    },
};
