"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailSender = void 0;
const sendTemplatedEmail_1 = require("./sendTemplatedEmail");
const templates_1 = require("./templates");
exports.emailSender = {
    enroll: async (to, args) => {
        await (0, sendTemplatedEmail_1.sendTemplatedEmail)(to, (0, templates_1.enrollEmailTemplate)(args), args);
    },
    payConfirm: async (to, args) => {
        await (0, sendTemplatedEmail_1.sendTemplatedEmail)(to, templates_1.payConfirmEmailTemplate, args);
    },
    enrollmentApproved: async (to, args) => {
        await (0, sendTemplatedEmail_1.sendTemplatedEmail)(to, templates_1.adminEnrollmentsApprovedEmailTemplate, args);
    },
    enrollmentRejected: async (to, args) => {
        await (0, sendTemplatedEmail_1.sendTemplatedEmail)(to, templates_1.adminEnrollmentsRejectedEmailTemplate, args);
    },
};
