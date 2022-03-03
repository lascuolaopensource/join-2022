import * as yup from "yup";
import { emailSchema } from "./utils";

/**
 * User Exists
 */

export type ueParam = "email" | "username";

export type ueType = Partial<Record<ueParam, string>>;

export const ueSchema = yup.object({
    email: emailSchema.optional(),
    username: yup.string().optional(),
});

export type ueResponse = {
    exists: boolean;
};
