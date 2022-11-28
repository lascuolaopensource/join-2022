import { entities as e, CTX } from "../../../utils";
import {
    errors as err,
    routes as r,
    types as t,
    helpers as h,
} from "join-shared";

import { Strapi } from "@strapi/strapi";
import { errors } from "@strapi/utils";
const { PolicyError } = errors;

//

export default async function (
    policyContext: CTX<r.Enroll.Req>,
    config: any,
    { strapi }: { strapi: Strapi }
) {
    const policyName = "is-enroll-body-valid";
    strapi.log.info(`POLICY - ${policyName}`);

    // Getting data
    const user = policyContext.state.user;
    const body = policyContext.request.body;

    // Checking that 'courseID' is in body
    if (!("courseId" in body)) {
        throw new PolicyError(err.missingCourseId, { policyName });
    }

    // Getting course
    let course: t.ID<t.Course>;
    try {
        course = await strapi.entityService.findOne(e.course, body.courseId);
    } catch (o) {
        strapi.log.info(err.courseNotFound);
        throw new PolicyError(err.courseNotFound, { policyName });
    }

    // Creating evaluation context
    const evaluationCtx = h.Course.getEvaluationSchemaCtx(course);
    const userCtx = r.Contacts.getSchemaCtx(user ? true : false);
    const context: r.Enroll.ISchemaCtx = { ...evaluationCtx, ...userCtx };

    // Validating body
    try {
        await r.Enroll.schema.validate(body, { context, abortEarly: false });
    } catch (o) {
        strapi.log.info(body);
        strapi.log.info(o);
        strapi.log.info(err.policies.bodyNotValid);
        throw new PolicyError(err.policies.bodyNotValid, { policyName });
    }

    return true;
}
