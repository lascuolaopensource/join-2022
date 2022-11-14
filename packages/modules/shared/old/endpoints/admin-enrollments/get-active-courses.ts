import { Enrollment, Course, ID } from "../../types";

export type AdminEnrollmentsGetUpcomingCoursesRes = {
	courses: Array<
		Omit<Course, "enrollments"> & { enrollments: Array<ID<Enrollment>> }
	>;
};
