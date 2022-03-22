"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("shared");
const stripe_1 = __importDefault(require("stripe"));
const utils_1 = require("../../../utils");
const stripe = new stripe_1.default(process.env.STRIPE_KEY, {
    apiVersion: "2020-08-27",
});
module.exports = {
    index: async (ctx, next) => {
        strapi.log.info("In pay controller");
        const body = ctx.request.body;
        const hash = ctx.params.hash;
        const payment = await (0, utils_1.getPaymentByHash)(hash);
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
        const billing = await strapi.entityService.create(utils_1.entities.billingInfo, { data: billingData });
        await strapi.entityService.update(utils_1.entities.payment, payment.id, {
            data: {
                billing: billing.id,
            },
        });
        const paymentDetails = await (0, utils_1.getPaymentDetails)(payment.id);
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
        return {
            sessionUrl: session.url,
        };
    },
    confirm: async (ctx, next) => {
        strapi.log.info("In payConfirm controller");
        const payment = await strapi
            .query(utils_1.entities.payment)
            .findOne({ where: { confirmCode: ctx.params.code } });
        await strapi.entityService.update(utils_1.entities.payment, payment.id, {
            data: {
                confirmed: true,
            },
        });
        const paymentDetails = await (0, utils_1.getPaymentDetails)(payment.id);
        if (paymentDetails.category == shared_1.t.PaymentCategories.course) {
            const paymentWithEnrollment = await strapi.entityService.findOne(utils_1.entities.payment, payment.id, { populate: { enrollment: true } });
            const enrollment = paymentWithEnrollment.enrollment;
            strapi.entityService.update(utils_1.entities.enrollment, enrollment.id, {
                data: {
                    state: shared_1.t.Enum_Enrollment_State.Pending,
                },
            });
        }
        return {
            confirmed: true,
            details: paymentDetails,
        };
    },
    getPaymentInfo: async (ctx, next) => {
        strapi.log.info("In pay/getPaymentInfo controller");
        const payment = await (0, utils_1.getPaymentByHash)(ctx.params.hash);
        const details = await (0, utils_1.getPaymentDetails)(payment.id);
        const billing = await (0, utils_1.getPaymentBillingInfo)(payment.id);
        return {
            payment,
            details,
            billing,
        };
    },
};
