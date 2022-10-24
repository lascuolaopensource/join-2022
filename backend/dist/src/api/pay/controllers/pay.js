"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils");
const payConfirm_1 = require("../emails/payConfirm");
const join_shared_1 = require("join-shared");
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_KEY, {
    apiVersion: "2022-08-01",
});
/**
 * A set of functions called "actions" for `pay`
 */
exports.default = {
    /**
     * Creates the link for a payment
     * @param ctx
     * @param next
     * @returns
     */
    execute: async (ctx, next) => {
        strapi.log.info("CONTROLLER - pay/execute");
        // Getting body
        const body = ctx.request.body;
        // Getting payment and populating billing data
        const payment = await (0, utils_1.getPaymentByUID)(body.paymentId, {
            billingData: "*",
            owner: "*",
        });
        // If billing data already exists, it has to be deleted to make room for the new one
        const existingBilling = payment.billingData;
        if (existingBilling) {
            await strapi.entityService.delete(utils_1.entities.billingData, existingBilling.id);
        }
        // Creating billing data with sent body
        const billingData = {
            payment: payment.id,
            address: body.address,
            owner: payment.owner.id,
            data: [
                {
                    ...body[body.billingOption],
                    __component: `billing.${body.billingOption}`,
                },
            ],
        };
        // Creating billing
        const billing = await strapi.entityService.create(utils_1.entities.billingData, {
            data: billingData,
        });
        // Updating payment with billing
        await strapi.entityService.update(utils_1.entities.payment, payment.id, {
            data: {
                billing: billing.id,
            },
        });
        // Creating payment urls
        const success_url = (0, utils_1.urlJoin)(process.env.FRONTEND_URL, process.env.FRONTEND_PAYMENT_CONFIRM.replace("[code]", payment.confirmationCode));
        // Creating payment url
        const cancel_url = (0, utils_1.urlJoin)(process.env.FRONTEND_URL, process.env.FRONTEND_PAYMENT_PATH.replace("[id]", payment.uid));
        // Creating payment and link
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
            success_url,
            cancel_url,
        });
        //
        return {
            sessionUrl: session.url,
        };
    },
    /**
     * Confirms a payment
     * @param ctx
     * @param next
     */
    confirm: async (ctx, next) => {
        strapi.log.info("CONTROLLER - pay/confirm");
        // Getting payment
        const payment = await strapi
            .query(utils_1.entities.payment)
            .findOne({
            where: { confirmationCode: ctx.request.body.confirmationCode },
            populate: {
                enrollment: "*",
            },
        });
        // Guards
        if (!payment) {
            return ctx.notFound(join_shared_1.errors.notFound, { object: "payment" });
        }
        if (payment.executed) {
            return ctx.badRequest(join_shared_1.errors.paymentAlreadyExecuted);
        }
        // Updating payment
        await strapi.entityService.update(utils_1.entities.payment, payment.id, {
            data: {
                executed: true,
            },
        });
        // Updating enrollment
        const enroll = payment.enrollment;
        if (enroll && enroll.state == join_shared_1.types.Enum_Enrollment_State.AwaitingPayment) {
            await strapi.entityService.update(utils_1.entities.enrollment, enroll.id, {
                data: {
                    state: join_shared_1.types.Enum_Enrollment_State.Pending,
                },
            });
        }
        // Updating any other relationships
        // ...
        // Sending confirmation email
        const dts = await (0, utils_1.getPaymentDetails)(payment.id);
        await payConfirm_1.PayConfirmEmail.send(dts.owner.email, {
            USER_NAME: dts.owner.name,
            PAYMENT: {
                CATEGORY: dts.category,
                TITLE: dts.title,
                PRICE: join_shared_1.formatters.formatPriceNumber(dts.price),
            },
        });
        return {
            confirmed: true,
        };
    },
};
