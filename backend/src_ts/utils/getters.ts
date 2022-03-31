import { Errors, types as t, helpers as h } from "shared";
import { entities } from "./entities";

/**
 * Payment stuff
 */

export async function getPaymentByHash(
    hash: string
): Promise<t.ID<t.PaymentC>> {
    return await strapi.query(entities.payment).findOne({ where: { hash } });
}

//

export function getPaymentHash(ctx: any): string {
    const hash = ctx.request?.body?.hash || ctx.params?.hash || null;
    if (!hash) {
        throw new Error(Errors.NotFound);
    }
    return hash;
}

//

export async function getPaymentBilling(
    paymentID: string | number
): Promise<t.ID<t.BillingInfo>> {
    // Getting payment
    const payment: t.ID<t.PaymentC> = await strapi.entityService.findOne(
        entities.payment,
        paymentID,
        {
            populate: {
                billing: true,
            },
        }
    );
    return payment.billing as t.ID<t.BillingInfo>;
}

//

export async function getPaymentBillingInfo(
    paymentID: string | number
): Promise<t.PaymentBillingInfo | null> {
    // Getting payment
    const payment: t.ID<t.PaymentC> = await strapi.entityService.findOne(
        entities.payment,
        paymentID,
        {
            populate: {
                billing: {
                    populate: ["data", "address"],
                },
            },
        }
    );

    if (!payment) {
        throw new Error(Errors.NotFound);
    }

    // Getting billing info
    const billingInfo = payment.billing as any as t.ID<t.BillingInfo>;

    if (billingInfo) {
        return {
            address: billingInfo.address,
            data: billingInfo.data[0] as t.Comp<t.BillingInfoDataDynamicZone>,
        };
    } else {
        return null;
    }
}

//

export async function getPaymentDetails(
    paymentID: string | number
): Promise<t.PaymentDetails> {
    const payment: t.ID<t.PaymentC> = await strapi.entityService.findOne(
        entities.payment,
        paymentID,
        {
            populate: {
                enrollment: {
                    populate: {
                        course: {
                            fields: ["title", "price"],
                        },
                    },
                },
                owner: {
                    populate: {
                        userInfo: true,
                    },
                },
            },
        }
    );

    if (!payment) {
        throw new Error(Errors.NotFound);
    }

    // Extracting relations
    const enrollment = payment.enrollment as any as t.ID<t.Enrollment>;
    const course = enrollment.course as any as t.ID<t.Course>;
    const owner = payment.owner as any as t.ID<t.UsersPermissionsUser>;
    const ownerInfo = owner.userInfo as any as t.ID<t.UserInfo>;

    return {
        category: t.PaymentCategories.course,
        title: course.title,
        price: course.price as number,
        paid: payment.paid,
        expiration: payment.expiration,
        expired: h.payment.isExpired(payment),
        owner: `${ownerInfo.name} ${ownerInfo.surname}`,
    };
}

//

export async function getPaymentOwner(
    paymentID: string | number
): Promise<t.ID<t.UsersPermissionsUser>> {
    const payment: t.ID<t.PaymentC> = await strapi.entityService.findOne(
        entities.payment,
        paymentID,
        {
            populate: {
                owner: true,
            },
        }
    );

    if (!payment) {
        throw new Error(Errors.NotFound);
    }

    // Getting owner
    const owner = payment.owner as any as t.ID<t.UsersPermissionsUser>;

    return owner;
}

/**
 * User stuff
 */

export async function getUserByEmail(email: string) {
    const user: t.ID<t.UsersPermissionsUser> = await strapi
        .query(entities.user)
        .findOne({ where: { email } });
    return user;
}

//

export async function getUserInfo(
    userID: string | number
): Promise<t.ID<t.UserInfo>> {
    const user: t.ID<t.UsersPermissionsUser> =
        await strapi.entityService.findOne(entities.user, userID, {
            populate: {
                userInfo: true,
            },
        });

    if (!user) {
        throw new Error(Errors.NotFound);
    }

    const userInfo: t.ID<t.UserInfo> = user.userInfo as any;

    return userInfo;
}

/**
 * Course stuff
 */

export async function getCourseByID(id: string | number, options = {}) {
    const course: t.ID<t.Course> = await strapi.entityService.findOne(
        entities.course,
        id,
        options
    );
    return course;
}

/**
 * Strapi utils
 */

export async function getUserPemissionsSettings() {
    // Copied from node_modules/@strapi/plugin-users-permissions/server/controllers/auth.js
    const pluginStore = await strapi.store({
        type: "plugin",
        name: "users-permissions",
    });
    const settings = await pluginStore.get({
        key: "advanced",
    });

    return settings as {
        allow_register: boolean;
        email_confirmation: boolean;
        default_role: any;
        unique_email: boolean;
    };
}

export function getService(name: string) {
    return strapi.plugin("users-permissions").service(name);
}
