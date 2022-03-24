"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paths = void 0;
exports.paths = {
    enroll: {
        payment: (paymentHash) => `/shared/payment/${paymentHash}`,
    },
    pay: {
        success: (confirmCode) => `/shared/payment/confirm-${confirmCode}`,
        cancel: (paymentHash) => `/shared/payment/${paymentHash}`,
    },
};
