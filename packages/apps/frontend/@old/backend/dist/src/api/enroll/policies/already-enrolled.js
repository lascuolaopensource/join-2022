"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils");
const join_shared_1 = require("join-shared");
const utils_2 = require("@strapi/utils");
const { PolicyError } = utils_2.errors;
//
async function default_1(policyContext, config, { strapi }) {
    const policyName = "already-enrolled";
    strapi.log.info(`POLICY - ${policyName}`);
    // Getting data
    const user = policyContext.state.user;
    const body = policyContext.request.body;
    // Saving email
    let email = "";
    if (user) {
        email = user.email;
    }
    else {
        email = policyContext.request.body.contacts.email;
    }
    // Getting all the enrollments of the course, with given owner (email)
    const enrollments = await strapi.entityService.findMany(utils_1.entities.enrollment, {
        filters: {
            course: {
                id: body.courseId,
            },
            owner: {
                email,
            },
        },
    });
    // If some exist, then someone's already enrolled with that email
    if (enrollments.length > 0) {
        throw new PolicyError(join_shared_1.errors.alreadyEnrolled, { policyName });
    }
    return true;
}
exports.default = default_1;
