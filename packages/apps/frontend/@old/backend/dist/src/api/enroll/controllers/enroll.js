"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const join_shared_1 = require("join-shared");
const lodash_1 = __importDefault(require("lodash"));
const utils_1 = require("../../../utils");
const emails_1 = require("../emails");
/**
 * A set of functions called "actions" for `enroll`
 */
exports.default = {
    index: async (ctx, next) => {
        strapi.log.info("CONTROLLER - enroll/index");
        /**
         * Setup
         */
        // Getting data
        const body = lodash_1.default.clone(ctx.request.body);
        // User may not exist, then the variable will be set in the next block
        let user = ctx.state.user;
        // Getting course
        const course = await strapi.entityService.findOne(utils_1.entities.course, body.courseId);
        /**
         * Creating user if not existing
         */
        if (!user) {
            // Generating a password for the new user
            const password = (0, utils_1.generateSecureString)(24);
            // Creating the data for creating the new user
            const createAccountBody = {
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
            emails_1.EnrollAccountEmail.send(user.email, {
                COURSE_NAME: course.name,
                PASSWORD: password,
            });
        }
        /**
         * Create enrollment
         */
        const enrollmentInput = {
            owner: user.id,
            cvUrl: body.evaluation.cv,
            portfolioUrl: body.evaluation.portfolio,
            motivationalLetter: body.evaluation.letter,
            course: body.courseId,
            phoneNumber: body.contacts.phone,
            state: join_shared_1.types.Enum_Enrollment_State.Pending,
        };
        const enrollment = await strapi.entityService.create(utils_1.entities.enrollment, {
            data: enrollmentInput,
        });
        /**
         * Create payment if needed
         */
        let paymentUID = null; // Stores payment uid in case it has to be sent
        if (join_shared_1.helpers.Course.isPaymentNeeded(course)) {
            // Creating payment
            const paymentData = {
                enrollment: enrollment.id,
                uid: (0, utils_1.generateSecureString)(64),
                confirmationCode: (0, utils_1.generateSecureString)(64),
                owner: user.id,
                executed: false,
                deadline: course.enrollmentDeadline,
            };
            const payment = await strapi.entityService.create(utils_1.entities.payment, { data: paymentData });
            // Saving ID
            paymentUID = paymentData.uid;
            // Creating payment url
            const paymentUrl = (0, utils_1.urlJoin)(process.env.FRONTEND_URL, process.env.FRONTEND_PAYMENT_PATH.replace("[id]", paymentData.uid));
            // Sending payment email
            emails_1.EnrollPaymentEmail.send(user.email, {
                COURSE_NAME: course.name,
                PAYMENT: {
                    DEADLINE: join_shared_1.formatters.formatDate(new Date(course.enrollmentDeadline)),
                    URL: paymentUrl,
                },
            });
            // Linking payment to enrollment
            await strapi.entityService.update(utils_1.entities.enrollment, enrollment.id, {
                data: {
                    payment: payment.id,
                    state: join_shared_1.types.Enum_Enrollment_State.AwaitingPayment,
                },
            });
        }
        /**
         * Confirmation email
         */
        emails_1.EnrollConfirmEmail.send(user.email, { COURSE_NAME: course.name });
        /**
         * Returning
         */
        return (ctx.body = { paymentUID });
    },
};
