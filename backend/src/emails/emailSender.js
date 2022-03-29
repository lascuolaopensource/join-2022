"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailSender = void 0;
const sendTemplatedEmail_1 = require("./sendTemplatedEmail");
const enroll_1 = require("./enroll");
const payConfirm_1 = require("./payConfirm");
exports.emailSender = {
    enroll: async (to, args) => {
        await (0, sendTemplatedEmail_1.sendTemplatedEmail)(to, (0, enroll_1.enrollEmailTemplate)(args), args);
    },
    payConfirm: async (to, args) => {
        await (0, sendTemplatedEmail_1.sendTemplatedEmail)(to, payConfirm_1.payConfirmEmailTemplate, args);
    },
};
