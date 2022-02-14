<script lang="ts">
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';

	import { OutsideTitle } from '$lib/components';
	import {
		Form,
		FormError,
		TextField,
		SubmitButton,
		setFormError
	} from '$lib/components/form';
	import { icons } from '$lib/icons';

	//

	const billingOptions = ['person', 'company'];

	const initialValues = {
		email: '',
		name: '',
		surname: '',
		phone: '',
		//
		letterNeeded: true,
		letter: '',
		portfolioNeeded: true,
		portfolio: '',
		cvNeeded: true,
		cv: '',
		//
		isFree: false,
		billingInfo: {
			email: '',
			billingOption: '',
			address: {
				cap: '',
				town: '',
				street: '',
				province: ''
			},
			person: {
				name: '',
				surname: '',
				cf: ''
			},
			company: {
				name: '',
				vat: '',
				sdi: ''
			}
		}
	};

	const validationSchema = yup.object({
		email: yup.string().email().required(),
		name: yup.string().required(),
		surname: yup.string().required(),
		phone: yup.string().required(),
		//
		letterNeeded: yup.boolean().required(),
		letter: yup.string().when('letterNeeded', {
			is: true,
			then: (schema) => schema.required(),
			otherwise: (schema) => schema.nullable()
		}),
		portfolioNeeded: yup.boolean().required(),
		portfolio: yup.string().when('portfolioNeeded', {
			is: true,
			then: (schema) => schema.required(),
			otherwise: (schema) => schema.nullable()
		}),
		cvNeeded: yup.boolean().required(),
		cv: yup.string().when('cvNeeded', {
			is: true,
			then: (schema) => schema.required(),
			otherwise: (schema) => schema.nullable()
		}),
		//
		isFree: yup.boolean().required(),
		billingInfo: yup.object().when('isFree', {
			is: false,
			otherwise: (schema) => schema.nullable(),
			then: (schema) =>
				schema
					.shape({
						// Generici
						email: yup.string().email().required(),
						billingOption: yup.string().oneOf(billingOptions).required(),
						address: yup
							.object({
								cap: yup.string().required(),
								town: yup.string().required(),
								province: yup.string().required(),
								street: yup.string().required()
							})
							.required(),
						// Persona fisica
						person: yup.object().when('billingOption', {
							is: 'person',
							then: (schema) =>
								schema.required().shape({
									name: yup.string().required(),
									surname: yup.string().required(),
									cf: yup.string().required()
								}),
							otherwise: (schema) => schema.nullable()
						}),
						// Azienda
						company: yup.object().when('billingOption', {
							is: 'company',
							then: (schema) =>
								schema.required().shape({
									name: yup.string().required(),
									vat: yup.string().required(),
									sdi: yup.string().required()
								}),
							otherwise: (schema) => schema.nullable()
						})
					})
					.required()
		})
	});

	async function onSubmit(values: typeof initialValues) {
		console.log(values);
	}

	const formContext = createForm({ initialValues, validationSchema, onSubmit });
</script>

<Form {formContext}>
	<h1>Dati di contatto</h1>
	<TextField name="name" labelText="Nome" />
	<TextField name="surname" labelText="Cognome" />
	<TextField name="email" labelText="Email" type="email" />
	<TextField
		name="phone"
		labelText="Numero di telefono"
		type="email"
		helperText="Ti chiediamo il numero di telefono per contattarti solo in casi di urgenza. Sarà eliminato al termine del corso."
	/>
	<hr />
	<!--  -->
	<h1>Dati di fatturazione</h1>
	<TextField name="billingInfo.email" labelText="Email" type="email" />
</Form>
