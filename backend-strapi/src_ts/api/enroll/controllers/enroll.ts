"use strict";

import { f, t, h } from "shared";
import { nanoid } from "nanoid";

/**
 * A set of functions called "actions" for `enroll`
 */

module.exports = {
    index: async (ctx: any, next: any) => {
        strapi.log.info("In enroll controller.");

        /**
         * Getting the body of the request
         */

        const body: f.enroll.enType = ctx.request.body;
        console.log(body);

        /**
         * Getting the course
         */

        const course: t.ID<t.Course> = await strapi.entityService.findOne(
            "api::course.course",
            body.courseId
        );

        /**
         * Getting the user
         */

        let user: t.ID<t.UsersPermissionsUser>;

        // If user doesn't exist, we create it
        if (!body.contacts.exists) {
            // Creating user
            const newUserData: t.UsersPermissionsUserInput = {
                email: body.contacts.user.email,
                username: nanoid(8),
                password: nanoid(8),
            };
            const newUser: t.ID<t.UsersPermissionsUser> =
                await strapi.entityService.create(
                    "plugin::users-permissions.user",
                    { data: newUserData }
                );

            // Saving user
            user = newUser;

            // Creating userinfo
            const newUserInfoData: t.UserInfoInput = {
                name: body.contacts.user.name,
                surname: body.contacts.user.surname,
                owner: user.id,
            };
            const newUserInfo: t.UserInfo = await strapi.entityService.create(
                "api::user-info.user-info",
                { data: newUserInfoData }
            );

            // TODO: Send confirmation email and password
        } else {
            user = ctx.state.user;
        }

        /**
         * Create phone
         */

        const phoneNumberData: t.PhoneNumberInput = {
            number: body.contacts.phone,
        };

        const phoneNumber: t.ID<t.PhoneNumber> =
            await strapi.entityService.create(
                "api::phone-number.phone-number",
                { data: phoneNumberData }
            );

        /**
         * Create enrollment
         */

        const enrollmentData: t.EnrollmentInput = {
            owner: user.id,
            cvUrl: body.evaluation.cv,
            portfolioUrl: body.evaluation.portfolio,
            motivationalLetter: body.evaluation.letter,
            course: body.courseId.toString(),
            phoneNumber: phoneNumber.id,
            state: t.Enum_Enrollment_State.Pending,
        };

        const enrollment: t.ID<t.Enrollment> =
            await strapi.entityService.create("api::enrollment.enrollment", {
                data: enrollmentData,
            });

        /**
         * Create payment if needed
         */

        let paymentData: t.PaymentInput | null = null;
        let payment: t.ID<t.Payment> | null = null;

        if (h.isBillingNeeded(course)) {
            // Creating payment
            paymentData = {
                enrollment: enrollment.id,
                hash: nanoid(),
            };
            console.log(paymentData);

            payment = await strapi.entityService.create(
                "api::payment.payment",
                { data: paymentData }
            );

            // Adding to enrollment
            await strapi.entityService.update(
                "api::enrollment.enrollment",
                enrollment.id,
                {
                    data: {
                        payment: payment?.id,
                        state: t.Enum_Enrollment_State.AwaitingPayment,
                    },
                }
            );
        }

        /**
         * Returning
         */

        // Returning payment id
        const response: f.enroll.enResponse = {
            paymentId: paymentData ? (paymentData.hash as string) : null,
        };
        ctx.body = response;
    },
};
