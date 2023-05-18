import { types as t, errors as e, helpers as h } from "join-shared";
import { entities } from "./entities";

//

export async function getUserByEmail(email: string) {
    const user: Array<t.ID<t.UsersPermissionsUser>> =
        await strapi.entityService.findMany(entities.user, {
            filters: {
                email,
            },
        });
    return user;
}

//

export async function getPaymentByUID(
    uid: string,
    populate = {}
): Promise<t.ID<t.PaymentC>> {
    // Getting payment
    const payments: Array<t.ID<t.PaymentC>> =
        await strapi.entityService.findMany(entities.payment, {
            filters: { uid },
            populate,
        });

    // If none or more than one is found, then throw error
    if (payments.length == 0 || payments.length > 1) {
        throw new Error(e.paymentNotFound);
    }

    return payments[0];
}

//

export async function getPaymentBilling(
    paymentID: string | number
): Promise<t.ID<t.BillingData>> {
    // Getting payment
    const payment: t.ID<t.Payment> = await strapi.entityService.findOne(
        entities.payment,
        paymentID,
        {
            populate: {
                billing: true,
            },
        }
    );
    return payment.billingData as any as t.ID<t.BillingData>;
}

//

export async function getPaymentDetails(
    paymentID: string | number
): Promise<t.PaymentDetails> {
    const payment: t.ID<t.Payment> = await strapi.entityService.findOne(
        entities.payment,
        paymentID,
        {
            populate: {
                enrollment: {
                    populate: {
                        course: "*",
                    },
                },
                owner: {
                    populate: {
                        info: "*",
                    },
                },
            },
        }
    );

    if (!payment) {
        throw new Error(e.paymentNotFound);
    }

    // Extracting relations
    const enrollment = payment.enrollment as any as t.ID<t.Enrollment>;
    const course = enrollment.course as any as t.ID<t.Course>;
    const owner = payment.owner as any as t.ID<t.UsersPermissionsUser>;
    const ownerInfo = owner.info as any as t.ID<t.UserInfo>;

    return {
        category: t.PaymentCategories.course,
        title: course.name,
        price: course.price as number,
        executed: payment.executed,
        deadline: payment.deadline,
        expired: h.Payment.isExpired(payment.deadline),
        owner: {
            name: ownerInfo.name,
            surname: ownerInfo.surname,
            email: owner.email,
        },
    };
}
