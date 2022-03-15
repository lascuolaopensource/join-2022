"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSecureString = exports.getUserByEmail = exports.getCourseByID = exports.entities = void 0;
const crypto_1 = __importDefault(require("crypto"));
exports.entities = {
    course: "api::course.course",
    user: "plugin::users-permissions.user",
};
async function getCourseByID(id, options = {}) {
    const course = await strapi.entityService.findOne(exports.entities.course, id, options);
    return course;
}
exports.getCourseByID = getCourseByID;
async function getUserByEmail(email) {
    const user = await strapi
        .query(exports.entities.user)
        .findOne({ where: { email } });
    return user;
}
exports.getUserByEmail = getUserByEmail;
function generateSecureString(length) {
    return crypto_1.default.randomBytes(length).toString("hex");
}
exports.generateSecureString = generateSecureString;
