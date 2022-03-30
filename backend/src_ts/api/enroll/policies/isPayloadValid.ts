"use strict";

const utils = require("@strapi/utils");
const { PolicyError } = utils.errors;

import { endpoints as e, Errors } from "shared";
import { getCourseByID } from "../../../utils";

/**
 * `isPayloadValid` policy.
 */

module.exports = async (policyContext: any, config: any, { strapi }: any) => {
    strapi.log.info("In isPayloadValid policy.");

    try {
        // Getting body
        const body: e.EnrollReq = policyContext.request.body;

        // Checking the structure
        // This can throw an error
        await e.EnrollSchema.validate(body);

        // Getting the course
        const course = await getCourseByID(body.courseId);

        // Checking info
        const check_cv = course.cvNeeded == body.evaluation.cvNeeded;
        const check_letter =
            course.motivationalLetterNeeded == body.evaluation.letterNeeded;
        const check_portfolio =
            course.portfolioNeeded == body.evaluation.portfolioNeeded;

        if (check_cv && check_letter && check_portfolio) {
            return true;
        } else {
            throw new Error();
        }
    } catch (err) {
        console.log(err);
        throw new PolicyError(Errors.ValidationError, {
            policy: "isPayloadValid",
        });
    }
};
