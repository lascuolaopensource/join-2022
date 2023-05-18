import {
    routes as r,
    types as t,
    helpers as h,
    formatters as f,
} from "join-shared";
import _ from "lodash";
import { generateSecureString, entities as e, urlJoin } from "../../../utils";
import {
    EnrollAccountEmail,
    EnrollConfirmEmail,
    EnrollPaymentEmail,
} from "../emails";

/**
 * A set of functions called "actions" for `enroll`
 */

export default {
    index: async (ctx: any, next: any): Promise<r.Enroll.Res> => {
        strapi.log.info("CONTROLLER - enroll/index");

        /**
         * Setup
         */

        // Getting data
        const body: r.Enroll.Req = _.clone(ctx.request.body);
        const courseID = ctx.params.id;

        // User may not exist, then the variable will be set in the next block
        let user: t.ID<t.UsersPermissionsUser> = ctx.state.user;

        // Getting course
        const course: t.ID<t.Course> = await strapi.entityService.findOne(
            e.course,
            courseID
        );

        /**
         * Creating user if not existing
         */

        if (!user) {
            // Generating a password for the new user
            const password = generateSecureString(24);

            // Creating the data for creating the new user
            const createAccountBody: r.Account.Register.Req = {
                name: body.contacts.name,
                surname: body.contacts.surname,
                email: body.contacts.email,
                password: password,
            };

            // Editing the request body to be the "create account" one
            ctx.request.body = createAccountBody;

            // Creating user
            await strapi
                .service("api::account.use-account-create-controller")
                .register(ctx);

            // Setting user
            user = ctx.response.body.user;

            // Sending registration email
            EnrollAccountEmail.send(user.email, {
                COURSE_NAME: course.name,
                PASSWORD: password,
            });
        }

        /**
         * Create enrollment
         */

        const enrollmentInput: t.EnrollmentInput = {
            owner: user.id,
            cvUrl: body.evaluation.cv,
            portfolioUrl: body.evaluation.portfolio,
            motivationalLetter: body.evaluation.letter,
            course: courseID,
            phoneNumber: body.contacts.phone,
            state: t.Enum_Enrollment_State.Pending,
        };

        const enrollment: t.ID<t.Enrollment> =
            await strapi.entityService.create(e.enrollment, {
                data: enrollmentInput,
            });

        /**
         * Create payment if needed
         */

        let paymentUID: string | null = null; // Stores payment uid in case it has to be sent

        if (h.Course.isPaymentNeeded(course)) {
            // Creating payment
            const paymentData: t.PaymentInput = {
                enrollment: enrollment.id,
                uid: generateSecureString(64),
                confirmationCode: generateSecureString(64),
                owner: user.id,
                executed: false,
                deadline: course.enrollmentDeadline,
            };
            const payment: t.ID<t.Payment> = await strapi.entityService.create(
                e.payment,
                { data: paymentData }
            );

            // Saving ID
            paymentUID = paymentData.uid;

            // Creating payment url
            const paymentUrl = urlJoin(
                process.env.FRONTEND_URL,
                process.env.FRONTEND_PAYMENT_PATH.replace(
                    "[id]",
                    paymentData.uid
                )
            );

            // Sending payment email
            EnrollPaymentEmail.send(user.email, {
                COURSE_NAME: course.name,
                PAYMENT: {
                    DEADLINE: f.formatDate(course.enrollmentDeadline),
                    URL: paymentUrl,
                },
            });

            // Linking payment to enrollment
            await strapi.entityService.update(e.enrollment, enrollment.id, {
                data: {
                    payment: payment.id,
                    state: t.Enum_Enrollment_State.AwaitingPayment,
                },
            });
        }

        /**
         * Confirmation email
         */

        EnrollConfirmEmail.send(user.email, { COURSE_NAME: course.name });

        /**
         * Returning
         */

        return (ctx.body = { paymentUID });
    },
};
