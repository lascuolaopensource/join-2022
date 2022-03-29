import { sendTemplatedEmail } from "./sendTemplatedEmail";
import { enrollEmailTemplate, EnrollEmailTemplateArgs } from "./enroll";
import {
    payConfirmEmailTemplate,
    PayConfirmEmailTemplateArgs,
} from "./payConfirm";

//

export const emailSender = {
    //
    enroll: async (to: string, args: EnrollEmailTemplateArgs) => {
        await sendTemplatedEmail(to, enrollEmailTemplate(args), args);
    },

    payConfirm: async (to: string, args: PayConfirmEmailTemplateArgs) => {
        await sendTemplatedEmail(to, payConfirmEmailTemplate, args);
    },
};
