"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateDiff = void 0;
function dateDiff(a, b) {
    return Date.parse(a) - Date.parse(b);
}
exports.dateDiff = dateDiff;
