import * as yup from "yup";

/**
 * LoginPassword
 */

export const lpValues = {
    password: "",
};

export const lpSchema = yup.object({
    password: yup.string().required(),
});

export type lpBody = typeof lpValues;
