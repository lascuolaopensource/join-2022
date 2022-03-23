"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("shared");
const utils_1 = require("../../../utils");
module.exports = {
    index: async (ctx, next) => {
        strapi.log.info("In enroll controller.");
        const body = ctx.request.body;
        const course = await (0, utils_1.getCourseByID)(body.courseId);
        const settings = await (0, utils_1.getUserPemissionsSettings)();
        let user;
        let userName;
        let userPassword = "";
        let confirmationUrl = "";
        if (!body.contacts.exists) {
            userPassword = (0, utils_1.generateSecureString)(24);
            userName = body.contacts.user.name;
            const newUserData = {
                email: body.contacts.user.email,
                username: body.contacts.user.email,
                password: userPassword,
                name: body.contacts.user.name,
                surname: body.contacts.user.surname,
            };
            if (settings.email_confirmation) {
                const confirmation = (0, utils_1.createConfirmationTokenURL)();
                newUserData.confirmationToken = confirmation.token;
                confirmationUrl = confirmation.url;
            }
            user = await (0, utils_1.registerUser)(newUserData);
        }
        else {
            user = ctx.state.user;
            const userWithInfo = await strapi.entityService.findOne(utils_1.entities.user, user.id, {
                populate: ["userInfo"],
            });
            const userInfo = userWithInfo.userInfo;
            userName = userInfo.name;
        }
        const phoneNumberData = {
            number: body.contacts.phone,
        };
        const phoneNumber = await strapi.entityService.create("api::phone-number.phone-number", { data: phoneNumberData });
        const enrollmentData = {
            owner: user.id,
            cvUrl: body.evaluation.cv,
            portfolioUrl: body.evaluation.portfolio,
            motivationalLetter: body.evaluation.letter,
            course: body.courseId.toString(),
            phoneNumber: phoneNumber.id,
            state: shared_1.t.Enum_Enrollment_State.Pending,
        };
        const enrollment = await strapi.entityService.create("api::enrollment.enrollment", {
            data: enrollmentData,
        });
        let paymentData = null;
        let payment = null;
        let paymentUrl = "";
        if (shared_1.h.course.isPaymentNeeded(course)) {
            const courseDeadlineStr = course.enrollmentDeadline;
            const expirationDate = new Date(Date.parse(courseDeadlineStr));
            expirationDate.setDate(expirationDate.getDate() + 1);
            paymentData = {
                enrollment: enrollment.id,
                hash: (0, utils_1.generateSecureString)(64),
                owner: user.id,
                confirmCode: (0, utils_1.generateSecureString)(64),
                confirmed: false,
                expiration: expirationDate.toISOString(),
            };
            payment = await strapi.entityService.create("api::payment.payment", { data: paymentData });
            await strapi.entityService.update(utils_1.entities.enrollment, enrollment.id, {
                data: {
                    payment: payment?.id,
                    state: shared_1.t.Enum_Enrollment_State.AwaitingPayment,
                },
            });
            paymentUrl = `${process.env.FRONTEND_URL}/shared/payments/${paymentData.hash}`;
        }
        const args = {
            COURSE_TITLE: course.title,
            USER_NAME: userName,
        };
        if (paymentData) {
            args.PAYMENT_URL = paymentUrl;
        }
        if (!body.contacts.exists && userPassword) {
            args.USER_ACCOUNT = {
                EMAIL: user.email,
                PASSWORD: userPassword,
            };
            if (settings.email_confirmation) {
                args.USER_ACCOUNT.CONFIRMATION_URL = confirmationUrl;
            }
        }
        try {
            await utils_1.emailManager.enroll(user.email, args);
        }
        catch (e) {
            throw e;
        }
        if (paymentData) {
            return { paymentId: paymentData.hash };
        }
        else {
            return {};
        }
    },
};
