"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getService = exports.getUserPemissionsSettings = exports.getCourseByID = exports.getUserEnrollments = exports.getUserInfo = exports.getUserByEmail = exports.getPaymentOwner = exports.getPaymentDetails = exports.getPaymentBillingInfo = exports.getPaymentBilling = exports.getPaymentHash = exports.getPaymentByHash = void 0;
const shared_1 = require("shared");
const entities_1 = require("./entities");
async function getPaymentByHash(hash) {
    return await strapi.query(entities_1.entities.payment).findOne({ where: { hash } });
}
exports.getPaymentByHash = getPaymentByHash;
function getPaymentHash(ctx) {
    const hash = ctx.request?.body?.hash || ctx.params?.hash || null;
    if (!hash) {
        throw new Error(shared_1.Errors.NotFound);
    }
    return hash;
}
exports.getPaymentHash = getPaymentHash;
async function getPaymentBilling(paymentID) {
    const payment = await strapi.entityService.findOne(entities_1.entities.payment, paymentID, {
        populate: {
            billing: true,
        },
    });
    return payment.billing;
}
exports.getPaymentBilling = getPaymentBilling;
async function getPaymentBillingInfo(paymentID) {
    const payment = await strapi.entityService.findOne(entities_1.entities.payment, paymentID, {
        populate: {
            billing: {
                populate: ["data", "address"],
            },
        },
    });
    if (!payment) {
        throw new Error(shared_1.Errors.NotFound);
    }
    const billingInfo = payment.billing;
    if (billingInfo) {
        return {
            address: billingInfo.address,
            data: billingInfo.data[0],
        };
    }
    else {
        return null;
    }
}
exports.getPaymentBillingInfo = getPaymentBillingInfo;
async function getPaymentDetails(paymentID) {
    const payment = await strapi.entityService.findOne(entities_1.entities.payment, paymentID, {
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
    });
    if (!payment) {
        throw new Error(shared_1.Errors.NotFound);
    }
    const enrollment = payment.enrollment;
    const course = enrollment.course;
    const owner = payment.owner;
    const ownerInfo = owner.userInfo;
    return {
        category: shared_1.types.PaymentCategories.course,
        title: course.title,
        price: course.price,
        paid: payment.paid,
        expiration: payment.expiration,
        expired: shared_1.helpers.payment.isExpired(payment),
        owner: `${ownerInfo.name} ${ownerInfo.surname}`,
    };
}
exports.getPaymentDetails = getPaymentDetails;
async function getPaymentOwner(paymentID) {
    const payment = await strapi.entityService.findOne(entities_1.entities.payment, paymentID, {
        populate: {
            owner: true,
        },
    });
    if (!payment) {
        throw new Error(shared_1.Errors.NotFound);
    }
    const owner = payment.owner;
    return owner;
}
exports.getPaymentOwner = getPaymentOwner;
async function getUserByEmail(email) {
    const user = await strapi
        .query(entities_1.entities.user)
        .findOne({ where: { email } });
    return user;
}
exports.getUserByEmail = getUserByEmail;
async function getUserInfo(userID) {
    const user = await strapi.entityService.findOne(entities_1.entities.user, userID, {
        populate: {
            userInfo: true,
        },
    });
    if (!user) {
        throw new Error(shared_1.Errors.NotFound);
    }
    const userInfo = user.userInfo;
    return userInfo;
}
exports.getUserInfo = getUserInfo;
async function getUserEnrollments(userID) {
    const user = await strapi.entityService.findOne(entities_1.entities.user, userID, {
        populate: {
            enrollments: {
                populate: {
                    course: {
                        populate: {
                            meetings: true,
                        },
                    },
                },
            },
        },
    });
    const enrollments = user.enrollments;
    return enrollments;
}
exports.getUserEnrollments = getUserEnrollments;
async function getCourseByID(id, options = {}) {
    const course = await strapi.entityService.findOne(entities_1.entities.course, id, options);
    return course;
}
exports.getCourseByID = getCourseByID;
async function getUserPemissionsSettings() {
    const pluginStore = await strapi.store({
        type: "plugin",
        name: "users-permissions",
    });
    const settings = await pluginStore.get({
        key: "advanced",
    });
    return settings;
}
exports.getUserPemissionsSettings = getUserPemissionsSettings;
function getService(name) {
    return strapi.plugin("users-permissions").service(name);
}
exports.getService = getService;
