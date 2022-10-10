import { entities as e, CTX, getUserByEmail } from "../../../utils";
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
    const policyName = "past-deadline";
    strapi.log.info(`POLICY - ${policyName}`);

    // Getting data
    const body = policyContext.request.body;

    // Getting course
    const course: t.ID<t.Course> = await strapi.entityService.findOne(
        e.course,
        body.courseId
    );

    // Getting deadline
    const deadline = new Date(course.enrollmentDeadline);
    // Getting today
    const today = new Date();

    if (today < deadline) {
        return true;
    } else {
        throw new PolicyError(err.pastDeadline, { policyName });
    }
}
