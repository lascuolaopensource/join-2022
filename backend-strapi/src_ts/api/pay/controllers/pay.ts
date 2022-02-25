"use strict";

import { f, t, h } from "shared";
import { nanoid } from "nanoid";

/**
 * A set of functions called "actions" for `pay`
 */

module.exports = {
    index: async (ctx: any, next: any) => {
        strapi.log.info("In pay controller");

        /**
         * Getting body
         */

        const body: f.payment.pType = ctx.request.body;

        /**
         * Getting payment
         */

        const paymentRes: [t.ID<t.Payment>] =
            await strapi.entityService.findMany("api::payment.payment", {
                filters: { hash: body.paymentHash },
            });
        const payment = paymentRes[0];

        /**
         * Creating billing
         */

        const billingData: t.BillingInfoInput = {
            payment: payment.id,
            address: body.billing.address,
            data: [],
        };

        // Me
        if (body.billing.billingOption == f.billing.bOptions[0]) {
            const dataMe: t.Comp<t.ComponentBillingMe> = {
                ...body.billing.me,
                __component: f.billing.bOptionsComp.me,
                cf: body.billing.me.cf,
            };
            billingData.data?.push(dataMe);
        }
        // Person
        else if (body.billing.billingOption == f.billing.bOptions[1]) {
            const dataPerson: t.Comp<t.ComponentBillingPerson> = {
                ...body.billing.person,
                __component: f.billing.bOptionsComp.person,
            };
            billingData.data?.push(dataPerson);
            billingData.email = body.billing.email;
        }
        // Company
        else if (body.billing.billingOption == f.billing.bOptions[2]) {
            const dataCompany: t.Comp<t.ComponentBillingCompany> = {
                ...body.billing.company,
                __component: f.billing.bOptionsComp.company,
            };
            billingData.data?.push(dataCompany);
            billingData.email = body.billing.email;
        }

        const billing: t.ID<t.BillingInfo> = await strapi.entityService.create(
            "api::billing-info.billing-info",
            { data: billingData }
        );

        /**
         * Updating payment with billing
         */

        await strapi.entityService.update("api::payment.payment", payment.id, {
            data: {
                billing: billing.id,
            },
        });

        /**
         *
         */

        // Si paga
        // Se il pagamento ha successo si segna che ha avuto successo
        // E l'enrollment deve essere segnato come pagato
    },
};
