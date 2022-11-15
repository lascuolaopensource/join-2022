"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils");
const join_shared_1 = require("join-shared");
const utils_2 = require("@strapi/utils");
const { PolicyError } = utils_2.errors;
//
async function default_1(policyContext, config, { strapi }) {
    const policyName = "past-deadline";
    strapi.log.info(`POLICY - ${policyName}`);
    // Getting data
    const body = policyContext.request.body;
    // Getting course
    const course = await strapi.entityService.findOne(utils_1.entities.course, body.courseId);
    // Getting deadline
    const deadline = new Date(course.enrollmentDeadline);
    // Getting today
    const today = new Date();
    if (today < deadline) {
        return true;
    }
    else {
        throw new PolicyError(join_shared_1.errors.pastDeadline, { policyName });
    }
}
exports.default = default_1;
