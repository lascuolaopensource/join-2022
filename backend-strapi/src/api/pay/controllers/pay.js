"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("shared");
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_KEY, {
    apiVersion: "2020-08-27",
});
module.exports = {
    index: async (ctx, next) => {
        strapi.log.info("In pay controller");
        const body = ctx.request.body;
        const paymentRes = await strapi.entityService.findMany("api::payment.payment", {
            filters: { hash: body.paymentHash },
        });
        const payment = paymentRes[0];
        const billingData = {
            payment: payment.id,
            address: body.billing.address,
            data: [],
        };
        if (body.billing.billingOption == shared_1.f.billing.bOptions[0]) {
            const dataMe = {
                ...body.billing.me,
                __component: shared_1.f.billing.bOptionsComp.me,
                cf: body.billing.me.cf,
            };
            billingData.data?.push(dataMe);
        }
        else if (body.billing.billingOption == shared_1.f.billing.bOptions[1]) {
            const dataPerson = {
                ...body.billing.person,
                __component: shared_1.f.billing.bOptionsComp.person,
            };
            billingData.data?.push(dataPerson);
            billingData.email = body.billing.email;
        }
        else if (body.billing.billingOption == shared_1.f.billing.bOptions[2]) {
            const dataCompany = {
                ...body.billing.company,
                __component: shared_1.f.billing.bOptionsComp.company,
            };
            billingData.data?.push(dataCompany);
            billingData.email = body.billing.email;
        }
        const billing = await strapi.entityService.create("api::billing-info.billing-info", { data: billingData });
        await strapi.entityService.update("api::payment.payment", payment.id, {
            data: {
                billing: billing.id,
            },
        });
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: "eur",
                        product_data: {
                            name: "T-shirt",
                        },
                        unit_amount: 2000,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/shared/payments/confirm-${payment.confirmCode}`,
            cancel_url: `${process.env.FRONTEND_URL}/shared/payments/${body.paymentHash}`,
        });
        return {
            sessionUrl: session.url,
        };
    },
    confirm: async (ctx, next) => {
        strapi.log.info("In payConfirm controller");
        const paymentRes = await strapi.entityService.findMany("api::payment.payment", {
            filters: { confirmCode: ctx.params.code },
        });
        const payment = paymentRes[0];
        await strapi.entityService.update("api::payment.payment", payment.id, {
            data: {
                confirmed: true,
            },
        });
        return {
            confirmed: true,
        };
    },
};
