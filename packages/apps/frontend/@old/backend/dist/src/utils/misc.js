"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlJoin = exports.generateSecureString = void 0;
const crypto_1 = __importDefault(require("crypto"));
function generateSecureString(length) {
    return crypto_1.default.randomBytes(length).toString("hex");
}
exports.generateSecureString = generateSecureString;
function urlJoin(...a) {
    let resultArray = [];
    if (a.length === 0) {
        return "";
    }
    if (typeof a[0] !== "string") {
        throw new TypeError("Url must be a string. Received " + a[0]);
    }
    // If the first part is a plain protocol, we combine it with the next part.
    if (a[0].match(/^[^/:]+:\/*$/) && a.length > 1) {
        let first = a.shift();
        a[0] = first + a[0];
    }
    // There must be two or three slashes in the file protocol, two slashes in anything else.
    if (a[0].match(/^file:\/\/\//)) {
        a[0] = a[0].replace(/^([^/:]+):\/*/, "$1:///");
    }
    else {
        a[0] = a[0].replace(/^([^/:]+):\/*/, "$1://");
    }
    for (let i = 0; i < a.length; i++) {
        let component = a[i];
        if (typeof component !== "string") {
            throw new TypeError("Url must be a string. Received " + component);
        }
        if (component === "") {
            continue;
        }
        if (i > 0) {
            // Removing the starting slashes for each component but the first.
            component = component.replace(/^[\/]+/, "");
        }
        if (i < a.length - 1) {
            // Removing the ending slashes for each component but the last.
            component = component.replace(/[\/]+$/, "");
        }
        else {
            // For the last component we will combine multiple slashes to a single one.
            component = component.replace(/[\/]+$/, "/");
        }
        resultArray.push(component);
    }
    let str = resultArray.join("/");
    // Each input component is now separated by a single slash except the possible first plain protocol part.
    // remove trailing slash before parameters or hash
    str = str.replace(/\/(\?|&|#[^!])/g, "$1");
    // replace ? in parameters with &
    let parts = str.split("?");
    str = parts.shift() + (parts.length > 0 ? "?" : "") + parts.join("&");
    return str;
}
exports.urlJoin = urlJoin;
