"use strict";

import { f, t, e } from "shared";
import Stripe from "stripe";

import {
    entities,
    getPaymentBillingInfo,
    getPaymentByHash,
    getPaymentDetails,
} from "../../../utils";

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

    index: async (ctx: any, next: any): Promise<f.payment.pResType> => {
        strapi.log.info("In pay controller");

        // Getting body & hash
        const body: f.payment.pType = ctx.request.body;
        const hash: string = ctx.params.hash;

        // Getting payment
        const payment = await getPaymentByHash(hash);

        // Creating billing data
        const billingData: t.BillingInfoInput = {
            payment: payment.id,
            address: body.billing.address,
            data: [],
        };
        // * Me
        if (body.billing.billingOption == f.billing.bOptions[0]) {
            const dataMe: t.Comp<t.ComponentBillingMe> = {
                ...body.billing.me,
                __component: f.billing.bOptionsComp.me,
                cf: body.billing.me.cf,
            };
            billingData.data?.push(dataMe);
        }
        // * Person
        else if (body.billing.billingOption == f.billing.bOptions[1]) {
            const dataPerson: t.Comp<t.ComponentBillingPerson> = {
                ...body.billing.person,
                __component: f.billing.bOptionsComp.person,
            };
            billingData.data?.push(dataPerson);
            billingData.email = body.billing.email;
        }
        // * Company
        else if (body.billing.billingOption == f.billing.bOptions[2]) {
            const dataCompany: t.Comp<t.ComponentBillingCompany> = {
                ...body.billing.company,
                __component: f.billing.bOptionsComp.company,
            };
            billingData.data?.push(dataCompany);
            billingData.email = body.billing.email;
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
            success_url: `${process.env.FRONTEND_URL}/shared/payments/confirm-${payment.confirmCode}`,
            cancel_url: `${process.env.FRONTEND_URL}/shared/payments/${hash}`,
        });

        //
        return {
            sessionUrl: session.url,
        };
    },

    /**
     * Confirms the payment
     */

    confirm: async (
        ctx: any,
        next: any
    ): Promise<f.payment.pConfirmResType> => {
        strapi.log.info("In payConfirm controller");

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

        // Updating relation
        const paymentDetails = await getPaymentDetails(payment.id);

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
    ): Promise<e.pay.getPaymentInfo.Res> => {
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
