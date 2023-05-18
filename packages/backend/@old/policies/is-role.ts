import { types as t, Errors } from "shared";
import { policies as p } from "../utils";

const utils = require("@strapi/utils");
const { PolicyError } = utils.errors;

module.exports = async (
    policyContext: any,
    config: p.IsRoleConfig,
    { strapi }: any
) => {
    const policy = "is-admin-enrollments";
    strapi.log.info(`In ${policy} policy`);

    // Getting role
    const roleToCheck = config.role;

    // Throwing error if no schema
    if (!roleToCheck) {
        throw new PolicyError(Errors.BadPolicyConfig, { policy });
    }

    // Getting user
    const user: t.ID<t.UsersPermissionsUser> = policyContext.state.user;
    // Getting role
    const role: t.ID<t.UsersPermissionsRole> = user.role as any;

    if (role.type == roleToCheck) {
        return true;
    } else {
        throw new PolicyError(Errors.InvalidRole);
    }
};
