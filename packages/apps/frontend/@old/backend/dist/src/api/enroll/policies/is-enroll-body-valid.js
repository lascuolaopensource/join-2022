"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils");
const join_shared_1 = require("join-shared");
const utils_2 = require("@strapi/utils");
const { PolicyError } = utils_2.errors;
//
async function default_1(policyContext, config, { strapi }) {
    const policyName = "is-enroll-body-valid";
    strapi.log.info(`POLICY - ${policyName}`);
    // Getting data
    const user = policyContext.state.user;
    const body = policyContext.request.body;
    // Checking that 'courseID' is in body
    if (!("courseId" in body)) {
        throw new PolicyError(join_shared_1.errors.missingCourseId, { policyName });
    }
    // Getting course
    let course;
    try {
        course = await strapi.entityService.findOne(utils_1.entities.course, body.courseId);
    }
    catch (o) {
        strapi.log.info(join_shared_1.errors.courseNotFound);
        throw new PolicyError(join_shared_1.errors.courseNotFound, { policyName });
    }
    // Creating evaluation context
    const evaluationCtx = join_shared_1.helpers.Course.getEvaluationSchemaCtx(course);
    const userCtx = join_shared_1.routes.Contacts.getSchemaCtx(user ? true : false);
    const context = { ...evaluationCtx, ...userCtx };
    // Validating body
    try {
        await join_shared_1.routes.Enroll.schema.validate(body, { context, abortEarly: false });
    }
    catch (o) {
        strapi.log.info(join_shared_1.errors.policies.bodyNotValid);
        throw new PolicyError(join_shared_1.errors.policies.bodyNotValid, { policyName });
    }
    return true;
}
exports.default = default_1;
