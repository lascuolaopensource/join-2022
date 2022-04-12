"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRole = exports.isBodyValid = void 0;
function isBodyValid(config) {
    return {
        name: "global::is-body-valid",
        config,
    };
}
exports.isBodyValid = isBodyValid;
function isRole(config) {
    return {
        name: "global::is-role",
        config,
    };
}
exports.isRole = isRole;
