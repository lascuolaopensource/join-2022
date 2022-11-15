import { EnrollmentEntity } from "../../types";
import * as yup from "yup";

export type AdminEnrollmentsUpdateReq = Array<EnrollmentEntity>;

export const AdminEnrollmentsUpdateSchema = yup.object().required();
