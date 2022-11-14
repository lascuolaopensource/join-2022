import { Enrollment, Course } from "../../types";

export type GetUserRelationsEnrollmentsRes = {
	enrollments: Array<Omit<Enrollment, "course"> & { course: Course }>;
};
