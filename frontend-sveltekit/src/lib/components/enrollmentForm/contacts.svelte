<script lang="ts">
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';

	import { Form, TextField, FormPage } from '$lib/components/form';

	//

	export let onSubmit: (values) => Promise<void>;

	export let initialValues = {
		email: '',
		name: '',
		surname: '',
		phone: ''
	};

	const validationSchema = yup.object({
		email: yup.string().email().required(),
		name: yup.string().required(),
		surname: yup.string().required(),
		phone: yup.string().required()
	});

	const formContext = createForm({ initialValues, validationSchema, onSubmit });
</script>

<!--  -->

<Form {formContext}>
	<FormPage>
		<h1>Dati di contatto</h1>

		<TextField name="name" labelText="Nome" />
		<TextField name="surname" labelText="Cognome" />
		<TextField name="email" labelText="Email" type="email" />
		<TextField
			name="phone"
			labelText="Numero di telefono"
			type="text"
			helperText="Ti chiediamo il numero di telefono per contattarti solo in casi di urgenza. Sarà eliminato al termine del corso."
		/>
	</FormPage>
</Form>
