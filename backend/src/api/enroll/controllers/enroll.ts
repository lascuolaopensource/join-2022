// import { endpoints as e, types as t, helpers as h } from "shared";
// import {
//     getCourseByID,
//     generateSecureString,
//     entities,
//     getUserPemissionsSettings,
//     registerUser,
//     registerUserErrorHandler,
//     RegisterUserInput,
//     generateConfirmationTokenURL,
//     paths,
// } from "../../../utils";
// import { emailSender, EnrollEmailTemplateArgs } from "../../../emails";

/**
 * A set of functions called "actions" for `enroll`
 */

export default {
    index: async (ctx: any, next: any) => {
        strapi.log.info("CONTROLLER - enroll/index");
        // // Getting the body of the request
        // const body: e.EnrollReq = ctx.request.body;
        // // Getting the course
        // const course = await getCourseByID(body.courseId);
        // // Getting user-permissions settings
        // const settings = await getUserPemissionsSettings();
        // /**
        //  * Getting the user
        //  */
        // let user: t.ID<t.UsersPermissionsUser>;
        // let userName: string;
        // let userPassword: string = "";
        // let confirmationUrl: string = "";
        // // Tutte queste info sono qui
        // // perchè verranno richiamate successivamente
        // // per l'invio della mail di conferma
        // // If user doesn't exist, we create it
        // if (!body.contacts.exists) {
        //     /**
        //      * Creating user data
        //      */
        //     userPassword = generateSecureString(24);
        //     userName = body.contacts.name;
        //     // Collecting user data for input
        //     const newUserData: RegisterUserInput = {
        //         email: body.contacts.email,
        //         password: userPassword,
        //         name: body.contacts.name,
        //         surname: body.contacts.surname,
        //     };
        //     // Adding confirmation token if needed
        //     if (settings.email_confirmation) {
        //         // Creating confirmation data
        //         const confirmation = generateConfirmationTokenURL();
        //         // Adding code to user data
        //         newUserData.confirmationToken = confirmation.token;
        //         // Saving confirmation link
        //         confirmationUrl = confirmation.url;
        //     }
        //     // Creating user
        //     try {
        //         user = await registerUser(newUserData);
        //     } catch (e) {
        //         return registerUserErrorHandler(e, ctx);
        //     }
        // }
        // // Otherwise, we pick the user in context
        // else {
        //     user = ctx.state.user;
        //     // Getting user with userinfo
        //     const userWithInfo: t.ID<t.UsersPermissionsUser> =
        //         await strapi.entityService.findOne(entities.user, user.id, {
        //             populate: ["userInfo"],
        //         });
        //     // Getting userInfo
        //     const userInfo = userWithInfo.userInfo as any as t.ID<t.UserInfo>;
        //     // Saving name
        //     userName = userInfo.name as string;
        // }
        // /**
        //  * Create phone
        //  */
        // const phoneNumberData: t.PhoneNumberInput = {
        //     number: body.contacts.phone,
        // };
        // const phoneNumber: t.ID<t.PhoneNumber> =
        //     await strapi.entityService.create(
        //         "api::phone-number.phone-number",
        //         { data: phoneNumberData }
        //     );
        // /**
        //  * Create enrollment
        //  */
        // const enrollmentData: t.EnrollmentInput = {
        //     owner: user.id,
        //     cvUrl: body.evaluation.cv,
        //     portfolioUrl: body.evaluation.portfolio,
        //     motivationalLetter: body.evaluation.letter,
        //     course: body.courseId.toString(),
        //     phoneNumber: phoneNumber.id,
        //     state: t.Enum_Enrollment_State.Pending,
        // };
        // const enrollment: t.ID<t.Enrollment> =
        //     await strapi.entityService.create(entities.enrollment, {
        //         data: enrollmentData,
        //     });
        // /**
        //  * Create payment if needed
        //  */
        // let paymentData: t.PaymentInput | null = null;
        // let payment: t.ID<t.PaymentC> | null = null;
        // let paymentUrl = "";
        // let paymentExpiration = "";
        // if (h.course.isPaymentNeeded(course)) {
        //     // Defining payment deadline
        //     const courseDeadlineStr = course.enrollmentDeadline;
        //     const expirationDate = new Date(Date.parse(courseDeadlineStr));
        //     expirationDate.setDate(expirationDate.getDate() + 1);
        //     // Saving string date for email
        //     paymentExpiration = expirationDate.toLocaleDateString("IT-it");
        //     // Creating payment
        //     paymentData = {
        //         enrollment: enrollment.id,
        //         hash: generateSecureString(64),
        //         owner: user.id,
        //         confirmCode: generateSecureString(64),
        //         paid: false,
        //         expiration: expirationDate.toISOString(),
        //     };
        //     payment = await strapi.entityService.create(entities.payment, {
        //         data: paymentData,
        //     });
        //     // Adding to enrollment
        //     await strapi.entityService.update(
        //         entities.enrollment,
        //         enrollment.id,
        //         {
        //             data: {
        //                 payment: payment?.id,
        //                 state: t.Enum_Enrollment_State.AwaitingPayment,
        //             },
        //         }
        //     );
        //     // Creating payment url
        //     paymentUrl = `${process.env.FRONTEND_URL}${paths.enroll.payment(
        //         paymentData.hash as string
        //     )}`;
        // }
        // /**
        //  * Confirmation email
        //  */
        // // Building email arguments
        // const args: EnrollEmailTemplateArgs = {
        //     COURSE_TITLE: course.title,
        //     USER_NAME: userName,
        // };
        // // Adding payment
        // if (paymentData) {
        //     args.PAYMENT = {
        //         URL: paymentUrl,
        //         EXPIRATION: paymentExpiration,
        //     };
        // }
        // // Adding user
        // if (!body.contacts.exists && userPassword) {
        //     args.USER_ACCOUNT = {
        //         EMAIL: user.email,
        //         PASSWORD: userPassword,
        //     };
        //     // If confirmation email
        //     if (settings.email_confirmation) {
        //         args.USER_ACCOUNT.CONFIRMATION_URL = confirmationUrl;
        //     }
        // }
        // // Sending email
        // try {
        //     await emailSender.enroll(user.email, args);
        // } catch (e) {
        //     throw e;
        // }
        // /**
        //  * Returning
        //  */
        // if (paymentData) {
        //     return { paymentId: paymentData.hash };
        // }
        // //
        // else {
        //     return {};
        // }
    },
};
