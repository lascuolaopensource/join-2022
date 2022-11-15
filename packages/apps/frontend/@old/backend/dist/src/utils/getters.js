"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentDetails = exports.getPaymentBilling = exports.getPaymentByUID = exports.getUserByEmail = void 0;
const join_shared_1 = require("join-shared");
const entities_1 = require("./entities");
//
async function getUserByEmail(email) {
    const user = await strapi.entityService.findMany(entities_1.entities.user, {
        filters: {
            email,
        },
    });
    return user;
}
exports.getUserByEmail = getUserByEmail;
//
async function getPaymentByUID(uid, populate = {}) {
    // Getting payment
    const payments = await strapi.entityService.findMany(entities_1.entities.payment, {
        filters: { uid },
        populate,
    });
    // If none or more than one is found, then throw error
    if (payments.length == 0 || payments.length > 1) {
        throw new Error(join_shared_1.errors.paymentNotFound);
    }
    return payments[0];
}
exports.getPaymentByUID = getPaymentByUID;
//
async function getPaymentBilling(paymentID) {
    // Getting payment
    const payment = await strapi.entityService.findOne(entities_1.entities.payment, paymentID, {
        populate: {
            billing: true,
        },
    });
    return payment.billingData;
}
exports.getPaymentBilling = getPaymentBilling;
//
async function getPaymentDetails(paymentID) {
    const payment = await strapi.entityService.findOne(entities_1.entities.payment, paymentID, {
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
    });
    if (!payment) {
        throw new Error(join_shared_1.errors.paymentNotFound);
    }
    // Extracting relations
    const enrollment = payment.enrollment;
    const course = enrollment.course;
    const owner = payment.owner;
    const ownerInfo = owner.info;
    return {
        category: join_shared_1.types.PaymentCategories.course,
        title: course.name,
        price: course.price,
        executed: payment.executed,
        deadline: payment.deadline,
        expired: join_shared_1.helpers.Payment.isExpired(payment.deadline),
        owner: {
            name: ownerInfo.name,
            surname: ownerInfo.surname,
            email: owner.email,
        },
    };
}
exports.getPaymentDetails = getPaymentDetails;
