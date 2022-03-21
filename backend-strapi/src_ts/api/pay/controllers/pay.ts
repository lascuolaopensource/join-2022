"use strict";

import { f, t, e } from "shared";
import Stripe from "stripe";

import { entities, getPaymentByHash } from "../../../utils";

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

        // Getting body
        const body: f.payment.pType = ctx.request.body;

        // Getting payment
        const paymentInfo = await getPaymentByHash(body.paymentHash);
        const payment = paymentInfo.payment;

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
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: "eur",
                        product_data: {
                            name: `${paymentInfo.relation.type} – ${paymentInfo.relation.subject}`,
                        },
                        unit_amount: paymentInfo.relation.price * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/shared/payments/confirm-${payment.confirmCode}`,
            cancel_url: `${process.env.FRONTEND_URL}/shared/payments/${body.paymentHash}`,
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
        const paymentRes: Array<t.ID<t.Payment>> =
            await strapi.entityService.findMany(entities.payment, {
                filters: { confirmCode: ctx.params.code },
            });
        const payment = paymentRes[0];

        // Updating payment
        await strapi.entityService.update(entities.payment, payment.id, {
            data: {
                confirmed: true,
            },
        });

        //
        return {
            confirmed: true,
        };
    },

    /**
     * Gets the payment
     */

    getPayment: async (ctx: any, next: any): Promise<e.pay.getPayment.Res> => {
        strapi.log.info("In pay/getPayment controller");

        return await getPaymentByHash(ctx.params.hash);
    },
};
