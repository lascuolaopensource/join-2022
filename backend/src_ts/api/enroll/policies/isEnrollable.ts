"use strict";

const utils = require("@strapi/utils");
const { PolicyError } = utils.errors;

import { e, h, Errors } from "shared";
import { getCourseByID } from "../../../utils";

/**
 * `isEnrollable` policy.
 */

module.exports = async (policyContext: any, config: any, { strapi }: any) => {
    strapi.log.info("In isEnrollable policy.");

    // Getting body
    const body: e.EnrollReq = policyContext.request.body;

    // Getting course
    const course = await getCourseByID(body.courseId);

    // Is expired or enrollable?
    const isEnrollable = h.course.isEnrollable(course);

    if (isEnrollable) {
        return true;
    } else {
        throw new PolicyError(Errors.EnrollmentExpired, {
            policy: "isEnrollable",
        });
    }
};