import * as yup from "yup";
import { thenReq, urlSchema } from "./utils";

/**
 * Evaluation
 */

export const evValues = {
    letterNeeded: true,
    letter: "",
    portfolioNeeded: true,
    portfolio: "",
    cvNeeded: true,
    cv: "",
};

export const evSchema = yup.object({
    letterNeeded: yup.boolean().required(),
    letter: yup.string().when("letterNeeded", thenReq(true)),
    portfolioNeeded: yup.boolean().required(),
    portfolio: urlSchema.when("portfolioNeeded", thenReq(true)),
    cvNeeded: yup.boolean().required(),
    cv: urlSchema.when("cvNeeded", thenReq(true)),
});

export type evType = typeof evValues;
