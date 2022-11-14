import * as yup from "yup";
import {
	HTTPMethod,
	Enum_Enrollment_State,
	Shape,
	EnrollmentStates,
} from "$types";

//

export namespace Update {
	export const path = "/admin-enrollments/update";
	export const method = HTTPMethod.POST;

	export interface Item {
		id: string;
		state: Enum_Enrollment_State;
	}

	export const itemSchema = yup.object<Shape<Item>>({
		id: yup.string().required(),
		state: yup.string().oneOf(EnrollmentStates).required(),
	});

	export interface Req {
		changes: Array<Item>;
	}

	export const schema = yup.object({
		changes: yup.array(itemSchema).required(),
	});

	export interface Res {}
}
