import type { Writable, Readable } from 'svelte/store';
import type * as yup from 'yup';

export type InitialValues = Record<string, any>;
export type Validate = (values: Record<string, any>) => Record<string, any>;
export type ValidationSchema = yup.ObjectSchema<any>;

// Copied from svelte-forms-lib
export type FormState<Inf = Record<string, any>> = {
	form: Writable<Inf>;
	errors: Writable<Record<keyof Inf, string>>;
	touched: Writable<Record<keyof Inf, boolean>>;
	modified: Readable<Record<keyof Inf, boolean>>;
	isValid: Readable<boolean>;
	isSubmitting: Writable<boolean>;
	isValidating: Writable<boolean>;
	isModified: Readable<boolean>;
	updateField: (field: keyof Inf, value: any) => void;
	updateValidateField: (field: keyof Inf, value: any) => void;
	updateTouched: (field: keyof Inf, value: any) => void;
	validateField: (field: keyof Inf) => Promise<any>;
	updateInitialValues: (newValues: Inf) => void;
	handleReset: () => void;
	state: Readable<{
		form: Inf;
		errors: Record<keyof Inf, string>;
		touched: Record<keyof Inf, boolean>;
		modified: Record<keyof Inf, boolean>;
		isValid: boolean;
		isSubmitting: boolean;
		isValidating: boolean;
		isModified: boolean;
	}>;
	handleChange: (event: Event) => any;
	handleSubmit: (event: Event) => any;
};
