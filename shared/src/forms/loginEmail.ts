import * as yup from "yup";
import { emailSchema } from "./utils";

/**
 * LoginEmail
 */

export const leValues = {
    email: "",
};

export const leSchema = yup.object({
    email: emailSchema.required(),
});

export type leType = typeof leValues;

export type leResponse = {
    email: string;
    name: string;
};

export const enum leErrors {
    notFound = "leNotFound",
    badRequest = "leBadRequest",
}
