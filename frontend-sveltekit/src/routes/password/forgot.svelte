<script lang="ts">
	import { goto } from '$app/navigation';
	import { req } from '$lib/requestUtils';

	import { createForm } from 'svelte-forms-lib';
	import { f } from 'shared';
	import { lsGet, lsKeys } from '$lib/localStorageUtils';

	//

	import { OutsideTitle } from '$lib/components';

	import { Form, TextField, SubmitButton, FormError, setFormError } from '$lib/components/form';

	import { icons } from '$lib/icons/icons.svelte';

	//

	async function onSubmit(values: f.loginEmail.leType) {
		try {
			// Sending the request to the server
			await req.forgotPassword(values);
			// If response is ok we send the user to a confirmation message
			await goto('/password/forgotconfirm');
		} catch (err) {
			setFormError(err.message);
		}
	}

	// Adding email from localstorage
	if (lsGet(lsKeys.email)) {
		f.loginEmail.leValues.email = lsGet(lsKeys.email);
	}

	const formContext = createForm({
		initialValues: f.loginEmail.leValues,
		validationSchema: f.loginEmail.leSchema,
		onSubmit
	});
</script>

<!-- --- Markup --- -->

<a class="backlink" href="/">Login</a>

<OutsideTitle>Resetta la password</OutsideTitle>

<Form {formContext}>
	<TextField
		name="email"
		type="email"
		placeholder="Inserisci la tua email"
		labelText="Email"
		labelIcon={icons.fields.email}
	/>
	<FormError />
	<SubmitButton>Recupera password</SubmitButton>
</Form>
