import * as yup from "yup";
import { types as t } from "shared";

//

export type IsBodyValidConfig = {
    schema: yup.AnySchema;
};

export function isBodyValid(config: IsBodyValidConfig) {
    return {
        name: "global::is-body-valid",
        config,
    };
}

//

export type IsRoleConfig = {
    role: t.UserPermissionRoles;
};

export function isRole(config: IsRoleConfig) {
    return {
        name: "global::is-role",
        config,
    };
}
