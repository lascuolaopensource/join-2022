import * as yup from "yup";
import { Schemas } from "../../validation";
import { Shape } from "../../types";

export namespace Evaluation {
	export interface Type {
		letter: string;
		portfolio: string;
		cv: string;
	}
	export const values: Type = {
		letter: "",
		portfolio: "",
		cv: "",
	};

	export const schema = yup.object<Shape<Type>>({
		letter: yup.string().when("$letterNeeded", Schemas.thenReq(true)),
		portfolio: yup
			.string()
			.when("$portfolioNeeded", Schemas.thenUrlReq(true)),
		cv: yup.string().when("$cvNeeded", Schemas.thenUrlReq(true)),
	});

	export interface ISchemaCtx {
		letterNeeded: boolean;
		portfolioNeeded: boolean;
		cvNeeded: boolean;
	}

	export function getSchemaCtx(
		letterNeeded: boolean,
		portfolioNeeded: boolean,
		cvNeeded: boolean
	): ISchemaCtx {
		return {
			letterNeeded,
			portfolioNeeded,
			cvNeeded,
		};
	}
}
