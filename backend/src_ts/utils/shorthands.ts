import * as yup from "yup";

export function policyIsBodyValid(schema: yup.AnySchema) {
    return {
        name: "global::isBodyValid",
        config: {
            schema,
        },
    };
}
