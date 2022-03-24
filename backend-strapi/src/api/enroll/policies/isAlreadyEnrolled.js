"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("@strapi/utils");
const { PolicyError } = utils.errors;
const utils_1 = require("../../../utils");
module.exports = async (policyContext, config, { strapi }) => {
    strapi.log.info("In isAlreadyEnrolled policy.");
    const body = policyContext.request.body;
    const course = await (0, utils_1.getCourseByID)(body.courseId, {
        populate: {
            enrollments: {
                populate: {
                    owner: {
                        fields: ["id", "email"],
                    },
                },
            },
        },
    });
    const enrollments = course.enrollments;
    let userEmail;
    if (policyContext.state.user) {
        userEmail = policyContext.state.user.email;
    }
    else {
        userEmail = body.contacts.email.toLowerCase();
    }
    for (let e of enrollments) {
        const owner = e.owner;
        if (owner.email == userEmail) {
            throw new PolicyError("alreadyEnrolled", {
                policy: "isAlreadyEnrolled",
            });
        }
    }
    return true;
};
