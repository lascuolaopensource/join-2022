import * as yup from "yup";
import { thenReq, thenUrlReq, urlSchema } from "./utils";

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
    portfolio: yup.string().when("portfolioNeeded", thenUrlReq(true)),
    cvNeeded: yup.boolean().required(),
    cv: yup.string().when("cvNeeded", thenUrlReq(true)),
});

export type evType = typeof evValues;
