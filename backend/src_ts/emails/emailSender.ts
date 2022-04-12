import { sendTemplatedEmail } from "./sendTemplatedEmail";
import {
    enrollEmailTemplate,
    EnrollEmailTemplateArgs,
    payConfirmEmailTemplate,
    PayConfirmEmailTemplateArgs,
    adminEnrollmentsApprovedEmailTemplate,
    AdminEnrollmentsApprovedEmailTemplateArgs,
    adminEnrollmentsRejectedEmailTemplate,
    AdminEnrollmentsRejectedEmailTemplateArgs,
} from "./templates";

//

export const emailSender = {
    //
    enroll: async (to: string, args: EnrollEmailTemplateArgs) => {
        await sendTemplatedEmail(to, enrollEmailTemplate(args), args);
    },

    payConfirm: async (to: string, args: PayConfirmEmailTemplateArgs) => {
        await sendTemplatedEmail(to, payConfirmEmailTemplate, args);
    },

    enrollmentApproved: async (
        to: string,
        args: AdminEnrollmentsApprovedEmailTemplateArgs
    ) => {
        await sendTemplatedEmail(
            to,
            adminEnrollmentsApprovedEmailTemplate,
            args
        );
    },

    enrollmentRejected: async (
        to: string,
        args: AdminEnrollmentsRejectedEmailTemplateArgs
    ) => {
        await sendTemplatedEmail(
            to,
            adminEnrollmentsRejectedEmailTemplate,
            args
        );
    },
};
