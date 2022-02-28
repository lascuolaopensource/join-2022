"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("shared");
const nanoid_1 = require("nanoid");
module.exports = {
    index: async (ctx, next) => {
        strapi.log.info("In enroll controller.");
        const body = ctx.request.body;
        console.log(body);
        const course = await strapi.entityService.findOne("api::course.course", body.courseId);
        let user;
        if (!body.contacts.exists) {
            const newUserData = {
                email: body.contacts.user.email,
                username: (0, nanoid_1.nanoid)(8),
                password: (0, nanoid_1.nanoid)(8),
            };
            const newUser = await strapi.entityService.create("plugin::users-permissions.user", { data: newUserData });
            user = newUser;
            const newUserInfoData = {
                name: body.contacts.user.name,
                surname: body.contacts.user.surname,
                owner: user.id,
            };
            const newUserInfo = await strapi.entityService.create("api::user-info.user-info", { data: newUserInfoData });
        }
        else {
            user = ctx.state.user;
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
        if (shared_1.h.isBillingNeeded(course)) {
            paymentData = {
                enrollment: enrollment.id,
                hash: (0, nanoid_1.nanoid)(),
                owner: user.id,
            };
            console.log(paymentData);
            payment = await strapi.entityService.create("api::payment.payment", { data: paymentData });
            await strapi.entityService.update("api::enrollment.enrollment", enrollment.id, {
                data: {
                    payment: payment?.id,
                    state: shared_1.t.Enum_Enrollment_State.AwaitingPayment,
                },
            });
        }
        const response = {
            paymentId: paymentData ? paymentData.hash : null,
        };
        ctx.body = response;
    },
};
//# sourceMappingURL=enroll.js.map