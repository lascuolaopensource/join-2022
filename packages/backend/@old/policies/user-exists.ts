import { types as t, Errors } from "shared";

const utils = require("@strapi/utils");
const { PolicyError } = utils.errors;

module.exports = async (policyContext: any, config: any, { strapi }: any) => {
    const policy = "user-exists";
    strapi.log.info(`In ${policy} policy`);

    // Getting user
    const user: t.ID<t.UsersPermissionsUser> = policyContext.state.user;

    if (user) {
        return true;
    } else {
        throw new PolicyError(Errors.UserNotFound);
    }
};
