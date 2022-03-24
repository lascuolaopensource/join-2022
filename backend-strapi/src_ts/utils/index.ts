import { t, e } from "shared";
import crypto from "crypto";

const urlJoin = require("url-join");
const { getAbsoluteServerUrl } = require("@strapi/utils");

//

export { registerUser, RegisterUserInput } from "./registerUser";

//

export const entities = {
    course: "api::course.course",
    user: "plugin::users-permissions.user",
    userInfo: "api::user-info.user-info",
    payment: "api::payment.payment",
    billingInfo: "api::billing-info.billing-info",
    enrollment: "api::enrollment.enrollment",
};

export async function getCourseByID(id: string | number, options = {}) {
    const course: t.ID<t.Course> = await strapi.entityService.findOne(
        entities.course,
        id,
        options
    );
    return course;
}

export async function getUserByEmail(email: string) {
    const user: t.ID<t.UsersPermissionsUser> = await strapi
        .query(entities.user)
        .findOne({ where: { email } });
    return user;
}

export function generateSecureString(length: number): string {
    return crypto.randomBytes(length).toString("hex");
}

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
    };
}

export function getService(name: string) {
    return strapi.plugin("users-permissions").service(name);
}

/**
 *
 */

export function createConfirmationTokenURL() {
    // Creating verification token
    const token = crypto.randomBytes(20).toString("hex");

    // Building the verification url
    const apiPrefix = strapi.config.get("api.rest.prefix");
    const url = urlJoin(
        getAbsoluteServerUrl(strapi.config),
        apiPrefix,
        `/auth/email-confirmation?confirmation=${token}`
    );

    return {
        token,
        url,
    };
}

/**
 *
 */

export function getPaymentHash(ctx: any): string {
    const hash = ctx.request?.body?.hash || ctx.params?.hash || null;
    if (!hash) {
        throw new Error("hashNotFound");
    }
    return hash;
}

//

export async function getPaymentByHash(hash: string): Promise<t.ID<t.Payment>> {
    return await strapi.query(entities.payment).findOne({ where: { hash } });
}

//

export async function getPaymentBillingInfo(
    paymentID: string | number
): Promise<t.PaymentBillingInfo | null> {
    // Getting payment
    const payment: t.ID<t.Payment> = await strapi.entityService.findOne(
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
        throw new Error("paymentNotFound");
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
    const payment: t.ID<t.Payment> = await strapi.entityService.findOne(
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
            },
        }
    );

    if (!payment) {
        throw new Error("paymentNotFound");
    }

    /**
     * Details – Enrollment
     */
    const enrollment = payment.enrollment as any as t.ID<t.Enrollment>;
    const course = enrollment.course as any as t.ID<t.Course>;
    const details: t.PaymentDetails = {
        category: t.PaymentCategories.course,
        title: course.title,
        price: course.price as number,
    };

    //

    return details;
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
        throw new Error("userNotFound");
    }

    const userInfo: t.ID<t.UserInfo> = user.userInfo as any;

    return userInfo;
}

//

export async function getPaymentOwner(
    paymentID: string | number
): Promise<t.ID<t.UsersPermissionsUser>> {
    const payment: t.ID<t.Payment> = await strapi.entityService.findOne(
        entities.payment,
        paymentID,
        {
            populate: {
                owner: true,
            },
        }
    );

    if (!payment) {
        throw new Error("paymentNotFound");
    }

    // Getting owner
    const owner = payment.owner as any as t.ID<t.UsersPermissionsUser>;

    return owner;
}
