"use strict";

const utils = require("@strapi/utils");
const { PolicyError } = utils.errors;

import { t, f, h } from "shared";
import { getCourseByID } from "../../../utils";

/**
 * `isAlreadyEnrolled` policy.
 */

module.exports = async (policyContext: any, config: any, { strapi }: any) => {
    strapi.log.info("In isAlreadyEnrolled policy.");

    // Getting body
    const body: f.enroll.enRequest = policyContext.request.body;

    // Getting course
    const course = await getCourseByID(body.courseId, {
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

    // Getting enrollments
    const enrollments = course.enrollments as any as Array<t.ID<t.Enrollment>>;

    // Getting user email
    let userEmail;
    if (policyContext.state.user) {
        userEmail = policyContext.state.user.email;
    } else {
        userEmail = body.contacts.user.email.toLowerCase();
    }

    // Iterating over enrollments to check for email
    for (let e of enrollments) {
        const owner = e.owner as any as t.ID<t.UsersPermissionsMe>;
        if (owner.email == userEmail) {
            throw new PolicyError("alreadyEnrolled", {
                policy: "isAlreadyEnrolled",
            });
        }
    }
    // Otherwise return true
    return true;
};
