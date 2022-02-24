<script lang="ts">
	import { createForm } from 'svelte-forms-lib';
	import { f } from 'shared';

	import { Form, TextField, FormPage } from '$lib/components/form';

	//

	export let userExists: boolean;

	export let onSubmit: (values) => Promise<void>;
	export let initialValues = f.contacts.cValues;

	//

	// Impostiamo userExists
	initialValues.exists = userExists;

	// Serve per facilitare la logica di validazione
	if (userExists) {
		initialValues.user = null;
	}

	// Creating form
	const formContext = createForm({
		initialValues,
		validationSchema: f.contacts.cSchema,
		onSubmit
	});
</script>

<!--  -->

<Form {formContext}>
	<FormPage>
		<h1>Dati di contatto</h1>

		{#if !userExists}
			<TextField name="user.name" labelText="Nome" />
			<TextField name="user.surname" labelText="Cognome" />
			<TextField name="user.email" labelText="Email" type="email" />
		{/if}

		<TextField
			name="phone"
			labelText="Numero di telefono"
			type="text"
			helperText="Ti chiediamo il numero di telefono per contattarti solo in casi di urgenza. Sarà eliminato al termine del corso."
		/>
	</FormPage>
</Form>
