"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("shared");
const stripe_1 = __importDefault(require("stripe"));
const lodash_1 = __importDefault(require("lodash"));
const utils_1 = require("../../../utils");
const emails_1 = require("../../../emails");
const stripe = new stripe_1.default(process.env.STRIPE_KEY, {
    apiVersion: "2020-08-27",
});
module.exports = {
    index: async (ctx, next) => {
        strapi.log.info("In pay controller");
        try {
            const body = ctx.request.body;
            const hash = ctx.params.hash;
            const payment = await (0, utils_1.getPaymentByHash)(hash);
            const existingBilling = await (0, utils_1.getPaymentBilling)(payment.id);
            if (existingBilling) {
                await strapi.entityService.delete(utils_1.entities.billingInfo, existingBilling.id);
            }
            const billingData = {
                payment: payment.id,
                address: body[body.billingOption].address,
                data: [
                    {
                        ...lodash_1.default.omit(body[body.billingOption], "address"),
                        __component: `billing.${body.billingOption}`,
                    },
                ],
            };
            const billing = await strapi.entityService.create(utils_1.entities.billingInfo, {
                data: billingData,
            });
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
                success_url: `${process.env.FRONTEND_URL}${utils_1.paths.pay.success(payment.confirmCode)}`,
                cancel_url: `${process.env.FRONTEND_URL}${utils_1.paths.pay.cancel(hash)}`,
            });
            return {
                sessionUrl: session.url,
            };
        }
        catch (e) {
            return ctx.internalServerError(e);
        }
    },
    confirm: async (ctx, next) => {
        strapi.log.info("In pay/confirm controller");
        const payment = await strapi
            .query(utils_1.entities.payment)
            .findOne({ where: { confirmCode: ctx.params.code } });
        if (!payment) {
            return ctx.notFound(shared_1.Errors.NotFound, { object: "payment" });
        }
        if (payment.paid) {
            return ctx.badRequest(shared_1.Errors.PaymentAlreadyConfirmed);
        }
        await strapi.entityService.update(utils_1.entities.payment, payment.id, {
            data: {
                paid: true,
            },
        });
        const paymentDetails = await (0, utils_1.getPaymentDetails)(payment.id);
        const owner = await (0, utils_1.getPaymentOwner)(payment.id);
        const ownerInfo = await (0, utils_1.getUserInfo)(owner.id);
        const formattedPrice = shared_1.formatters.formatPriceNumber(paymentDetails.price);
        const args = {
            USER_NAME: ownerInfo.name,
            PAYMENT: {
                CATEGORY: paymentDetails.category,
                TITLE: paymentDetails.title,
                PRICE: formattedPrice,
            },
        };
        await emails_1.emailSender.payConfirm(owner.email, args);
        if (paymentDetails.category == shared_1.types.PaymentCategories.course) {
            const paymentWithEnrollment = await strapi.entityService.findOne(utils_1.entities.payment, payment.id, { populate: { enrollment: true } });
            const enrollment = paymentWithEnrollment.enrollment;
            strapi.entityService.update(utils_1.entities.enrollment, enrollment.id, {
                data: {
                    state: shared_1.types.Enum_Enrollment_State.Pending,
                },
            });
        }
        return {
            confirmed: true,
            details: paymentDetails,
        };
    },
    getPaymentDetails: async (ctx, next) => {
        strapi.log.info("In pay/getPaymentInfo controller");
        const payment = await (0, utils_1.getPaymentByHash)(ctx.params.hash);
        const details = await (0, utils_1.getPaymentDetails)(payment.id);
        return details;
    },
};
