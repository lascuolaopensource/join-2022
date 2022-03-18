"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailManager = void 0;
const sendEmail_1 = require("./sendEmail");
const enroll_1 = require("./enroll");
exports.emailManager = {
    enroll: async (to, args) => {
        await (0, sendEmail_1.sendTemplatedEmail)(to, (0, enroll_1.enrollTemplate)(args), args);
    },
};
