"use strict";

import { t, e } from "shared";
import Stripe from "stripe";

import {
    entities,
    getPaymentBillingInfo,
    getPaymentByHash,
    getPaymentDetails,
    getPaymentOwner,
    getUserInfo,
    paths,
} from "../../../utils";
import { emailSender, PayConfirmEmailTemplateArgs } from "../../../emails";

const stripe = new Stripe(process.env.STRIPE_KEY as string, {
    apiVersion: "2020-08-27",
});

/**
 * A set of functions called "actions" for `pay`
 */

module.exports = {
    /**
     * Creates the payment
     */

    index: async (ctx: any, next: any): Promise<e.PayRes> => {
        strapi.log.info("In pay controller");

        // Getting body & hash
        const body: e.PayReq = ctx.request.body;
        const hash: string = ctx.params.hash;

        // Getting payment
        const payment = await getPaymentByHash(hash);

        // Creating billing data
        const billingData: t.BillingInfoInput = {
            payment: payment.id,
            address: body.address,
            data: [],
        };
        // * Me
        if (body.billingOption == t.BillingOptions[0]) {
            const dataMe: t.Comp<t.ComponentBillingMe> = {
                ...body.me,
                __component: t.BillingOptionsComponents.Me,
                cf: body.me.cf,
            };
            billingData.data?.push(dataMe);
        }
        // * Person
        else if (body.billingOption == t.BillingOptions[1]) {
            const dataPerson: t.Comp<t.ComponentBillingPerson> = {
                ...body.person,
                __component: t.BillingOptionsComponents.Person,
            };
            billingData.data?.push(dataPerson);
            billingData.email = body.email;
        }
        // * Company
        else if (body.billingOption == t.BillingOptions[2]) {
            const dataCompany: t.Comp<t.ComponentBillingCompany> = {
                ...body.company,
                __component: t.BillingOptionsComponents.Company,
            };
            billingData.data?.push(dataCompany);
            billingData.email = body.email;
        }

        // Creating billing
        const billing: t.ID<t.BillingInfo> = await strapi.entityService.create(
            entities.billingInfo,
            { data: billingData }
        );

        // Updating payment with billing
        await strapi.entityService.update(entities.payment, payment.id, {
            data: {
                billing: billing.id,
            },
        });

        // Creating payment
        const paymentDetails = await getPaymentDetails(payment.id);
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: "eur",
                        product_data: {
                            name: `${paymentDetails.category} – ${paymentDetails.title}`,
                        },
                        unit_amount: paymentDetails.price * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}${paths.pay.success(
                payment.confirmCode
            )}`,
            cancel_url: `${process.env.FRONTEND_URL}${paths.pay.cancel(hash)}`,
        });

        //
        return {
            sessionUrl: session.url,
        };
    },

    /**
     * Confirms the payment
     */

    confirm: async (ctx: any, next: any): Promise<e.PayConfirmRes> => {
        strapi.log.info("In payConfirm controller");

        /**
         * Payment update
         */

        // Getting payment
        const payment: t.ID<t.Payment> = await strapi
            .query(entities.payment)
            .findOne({ where: { confirmCode: ctx.params.code } });

        // Updating payment
        await strapi.entityService.update(entities.payment, payment.id, {
            data: {
                confirmed: true,
            },
        });

        // Getting payment details
        const paymentDetails = await getPaymentDetails(payment.id);

        /**
         * Sending confirmation email
         */

        // Getting payment owner
        const owner = await getPaymentOwner(payment.id);
        // Getting user info
        const ownerInfo = await getUserInfo(owner.id);

        // Formatting price
        const formatter = new Intl.NumberFormat("it-IT", {
            style: "currency",
            currency: "EUR",
        });
        const formattedPrice = formatter.format(paymentDetails.price);

        // Sending email
        const args: PayConfirmEmailTemplateArgs = {
            USER_NAME: ownerInfo.name as string,
            PAYMENT: {
                CATEGORY: paymentDetails.category,
                TITLE: paymentDetails.title,
                PRICE: formattedPrice,
            },
        };
        await emailSender.payConfirm(owner.email, args);

        /**
         * Updating relation
         */

        if (paymentDetails.category == t.PaymentCategories.course) {
            // Getting enrollment
            const paymentWithEnrollment: t.ID<t.Payment> =
                await strapi.entityService.findOne(
                    entities.payment,
                    payment.id,
                    { populate: { enrollment: true } }
                );

            // Enrollment
            const enrollment =
                paymentWithEnrollment.enrollment as any as t.ID<t.Enrollment>;

            // Updating enrollment
            strapi.entityService.update(entities.enrollment, enrollment.id, {
                data: {
                    state: t.Enum_Enrollment_State.Pending,
                },
            });
        }

        //
        return {
            confirmed: true,
            details: paymentDetails,
        };
    },

    /**
     * Gets the payment with all related info,
     * useful for payment page on frontend
     */

    getPaymentInfo: async (
        ctx: any,
        next: any
    ): Promise<e.PayGetPaymentInfoRes> => {
        strapi.log.info("In pay/getPaymentInfo controller");

        const payment = await getPaymentByHash(ctx.params.hash);
        const details = await getPaymentDetails(payment.id);
        const billing = await getPaymentBillingInfo(payment.id);

        return {
            payment,
            details,
            billing,
        };
    },
};
