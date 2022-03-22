import { req } from '$lib/requestUtils';
import * as yup from 'yup';
export const passwordValidator = yup.string().required().min(8).max(52);

export const urlValidator = yup
	.string()
	.matches(
		/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
		'Please enter valid url'
	);
