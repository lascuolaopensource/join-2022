import * as yup from "yup";
import { thenReq } from "./utils";

/**
 * Contacts
 */

export const cValues = {
    exists: false,
    user: {
        email: "",
        name: "",
        surname: "",
    },
    phone: "",
};

export const cSchema = yup.object({
    exists: yup.boolean().required(),
    user: yup
        .object({
            email: yup.string().email().required(),
            name: yup.string().required(),
            surname: yup.string().required(),
        })
        .when("exists", thenReq(false)),
    phone: yup.string().required(),
});

export type cType = typeof cValues;
