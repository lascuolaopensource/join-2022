import {
    CTX,
    getPaymentByUID,
    getPaymentDetails,
    entities,
    urlJoin,
} from "../../../utils";
import { PayConfirmEmail } from "../emails/payConfirm";
import {
    routes as r,
    types as t,
    errors as e,
    formatters as f,
} from "join-shared";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_KEY, {
    apiVersion: "2022-08-01",
});

/**
 * A set of functions called "actions" for `pay`
 */

export default {
    /**
     * Creates the link for a payment
     * @param ctx
     * @param next
     * @returns
     */

    execute: async (
        ctx: CTX<r.Pay.Execute.Req>,
        next
    ): Promise<r.Pay.Execute.Res> => {
        strapi.log.info("CONTROLLER - pay/execute");

        // Getting body
        const body: r.Pay.Execute.Req = ctx.request.body;
        const paymentID = ctx.params.id;

        // Getting payment and populating billing data
        const payment = await getPaymentByUID(paymentID, {
            billingData: "*",
            owner: "*",
        });

        // If billing data already exists, it has to be deleted to make room for the new one
        const existingBilling =
            payment.billingData as any as t.ID<t.BillingData>;
        if (existingBilling) {
            await strapi.entityService.delete(
                entities.billingData,
                existingBilling.id
            );
        }

        // Creating billing data with sent body
        const billingData: t.BillingDataInput = {
            payment: payment.id,
            address: body.address,
            owner: (payment.owner as any).id,
            data: [
                {
                    ...body[body.billingOption],
                    __component: `billing.${body.billingOption}`,
                },
            ],
        };

        // Creating billing
        const billing: t.ID<t.BillingData> = await strapi.entityService.create(
            entities.billingData,
            {
                data: billingData,
            }
        );

        // Updating payment with billing
        await strapi.entityService.update(entities.payment, payment.id, {
            data: {
                billing: billing.id,
            },
        });

        // Creating payment urls
        const success_url = urlJoin(
            process.env.FRONTEND_URL,
            process.env.FRONTEND_PAYMENT_CONFIRM.replace(
                "[code]",
                payment.confirmationCode
            )
        );
        // Creating payment url
        const cancel_url = urlJoin(
            process.env.FRONTEND_URL,
            process.env.FRONTEND_PAYMENT_PATH.replace("[id]", payment.uid)
        );

        // Creating payment and link
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

    confirm: async (
        ctx: CTX<r.Pay.Confirm.Req>,
        next
    ): Promise<r.Pay.Confirm.Res> => {
        strapi.log.info("CONTROLLER - pay/confirm");

        // Getting payment
        const payment: t.ID<t.PaymentC> = await strapi
            .query(entities.payment)
            .findOne({
                where: { confirmationCode: ctx.request.body.confirmationCode },
                populate: {
                    enrollment: "*",
                },
            });

        // Guards
        if (!payment) {
            return ctx.notFound(e.notFound, { object: "payment" });
        }
        if (payment.executed) {
            return ctx.badRequest(e.paymentAlreadyExecuted);
        }

        // Updating payment
        await strapi.entityService.update(entities.payment, payment.id, {
            data: {
                executed: true,
            },
        });

        // Updating enrollment
        const enroll = payment.enrollment as any as t.ID<t.Enrollment>;
        if (enroll && enroll.state == t.Enum_Enrollment_State.AwaitingPayment) {
            await strapi.entityService.update(entities.enrollment, enroll.id, {
                data: {
                    state: t.Enum_Enrollment_State.Pending,
                },
            });
        }

        // Updating any other relationships
        // ...

        // Sending confirmation email
        const dts = await getPaymentDetails(payment.id);

        await PayConfirmEmail.send(dts.owner.email, {
            USER_NAME: dts.owner.name,
            PAYMENT: {
                CATEGORY: dts.category,
                TITLE: dts.title,
                PRICE: f.formatPriceNumber(dts.price),
            },
        });

        return {
            confirmed: true,
        };
    },
};
