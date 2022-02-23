"use strict";

const { validator } = require("shared");

/**
 * A set of functions called "actions" for `enroll`
 */

module.exports = {
    index: async (ctx, next) => {
        strapi.log.info("In enroll controller.");

        // Getting the body of the request
        const body = ctx.request.body;
        console.log(body);

        let userId;
        // If user doesn't exist, we create it
        if (!body.contacts.userExists) {
            // Generate password and username
            // TODO

            // Creating user
            const newUser = await strapi.entityService.create(
                "plugin::users-permissions.user",
                {
                    data: {
                        email: body.contacts.user.email,
                        username: body.contacts.user.email,
                        password: "giovanni",
                    },
                }
            );

            // Saving id
            userId = newUser.id;

            // Creating userinfo
            const newUserInfo = await strapi.entityService.create(
                "api::user-info.user-info",
                {
                    data: {
                        name: body.contacts.user.name,
                        surname: body.contacts.user.surname,
                        owner: userId,
                    },
                }
            );

            // Send confirmation email and password
            // TODO
        } else {
            userId = ctx.state.user.id;
        }

        // Create phone
        const phoneNumber = await strapi.entityService.create(
            "api::phone-number.phone-number",
            {
                data: {
                    number: body.contacts.phone,
                },
            }
        );

        // // Create billling
        // const billingData = {
        //     address: body.billing.address,
        // };

        // // Conditional billingData component creation
        // let data;
        // if (body.billing.billingOption == validator.billingOptions[0]) {
        //     if (ctx.state.user) {
        //         billingData["email"] = ctx.state.user.email;
        //         data = {
        //             __component: "billing.person",
        //             name: "user.userinfo.name",
        //             surname: "user.userinfo.surname",
        //             cf: body.billing.me.cf,
        //         };
        //     } else {
        //         billingData["email"] = body.contacts.user.email;
        //         data = {
        //             __component: "billing.person",
        //             name: body.contacts.user.name,
        //             surname: body.contacts.user.surname,
        //             cf: body.billing.me.cf,
        //         };
        //     }
        // } else if (body.billing.billingOption == validator.billingOptions[1]) {
        //     data = {
        //         __component: "billing.person",
        //         name: body.billing.person.name,
        //         surname: body.billing.person.surname,
        //         cf: body.billing.person.cf,
        //     };
        // } else if ((body.billing.billingOption = validator.billingOptions[2])) {
        //     data = {
        //         __component: "billing.company",
        //         name: body.billing.company.name,
        //         vat: body.billing.company.vat,
        //         sdi: body.billing.company.sdi,
        //     };
        // }

        // const billing = await strapi.entityService.create(
        //     "api::billing-info.billing-info",
        //     {
        //         data: billingData,
        //     }
        // );
        // if (body.billingNeeded) {
        //     // Create billing
        // }

        // Create enrollment
        const enrollment = await strapi.entityService.create(
            "api::enrollment.enrollment",
            {
                data: {
                    owner: userId,
                    state: "pending",
                    cvUrl: body.evaluation.cv,
                    portfolioUrl: body.evaluation.portfolio,
                    motivationalLetter: body.evaluation.letter,
                    course: body.courseId,
                    phoneNumber: phoneNumber.id,
                },
            }
        );

        try {
            ctx.body = enrollment;
        } catch (e) {
            ctx.body = e;
        }
    },
};
