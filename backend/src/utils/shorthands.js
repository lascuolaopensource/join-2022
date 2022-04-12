"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.policyIsBodyValid = void 0;
function policyIsBodyValid(schema) {
    return {
        name: "global::isBodyValid",
        config: {
            schema,
        },
    };
}
exports.policyIsBodyValid = policyIsBodyValid;
