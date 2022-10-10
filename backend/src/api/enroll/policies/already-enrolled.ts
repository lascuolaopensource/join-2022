import { entities as e, CTX } from "../../../utils";
import { errors as err, routes as r, types as t } from "join-shared";

import { Strapi } from "@strapi/strapi";
import { errors } from "@strapi/utils";
const { PolicyError } = errors;

//

export default async function (
    policyContext: CTX<r.Enroll.Req>,
    config: any,
    { strapi }: { strapi: Strapi }
) {
    const policyName = "already-enrolled";
    strapi.log.info(`POLICY - ${policyName}`);

    // Getting data
    const user = policyContext.state.user;
    const body = policyContext.request.body;

    // Saving email
    let email = "";
    if (user) {
        email = user.email;
    } else {
        email = policyContext.request.body.contacts.email;
    }

    // Getting all the enrollments of the course, with given owner (email)
    const enrollments: Array<t.ID<t.Enrollment>> =
        await strapi.entityService.findMany(e.enrollment, {
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
        throw new PolicyError(err.alreadyEnrolled, { policyName });
    }

    return true;
}
