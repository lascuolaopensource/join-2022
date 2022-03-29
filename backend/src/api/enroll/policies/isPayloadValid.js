"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("@strapi/utils");
const { PolicyError } = utils.errors;
const shared_1 = require("shared");
const utils_1 = require("../../../utils");
module.exports = async (policyContext, config, { strapi }) => {
    strapi.log.info("In isPayloadValid policy.");
    try {
        const body = policyContext.request.body;
        await shared_1.e.EnrollSchema.validate(body);
        const course = await (0, utils_1.getCourseByID)(body.courseId);
        const check_cv = course.cvNeeded == body.evaluation.cvNeeded;
        const check_letter = course.motivationalLetterNeeded == body.evaluation.letterNeeded;
        const check_portfolio = course.portfolioNeeded == body.evaluation.portfolioNeeded;
        if (check_cv && check_letter && check_portfolio) {
            return true;
        }
        else {
            throw new Error();
        }
    }
    catch (err) {
        console.log(err);
        throw new PolicyError(shared_1.Errors.ValidationError, {
            policy: "isPayloadValid",
        });
    }
};
