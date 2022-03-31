"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("@strapi/utils");
const { PolicyError } = utils.errors;
const shared_1 = require("shared");
const utils_1 = require("../../../utils");
module.exports = async (policyContext, config, { strapi }) => {
    strapi.log.info("In isEnrollable policy.");
    const body = policyContext.request.body;
    const course = await (0, utils_1.getCourseByID)(body.courseId);
    const isEnrollable = shared_1.helpers.course.isEnrollable(course);
    if (isEnrollable) {
        return true;
    }
    else {
        throw new PolicyError(shared_1.Errors.EnrollmentExpired, {
            policy: "isEnrollable",
        });
    }
};
