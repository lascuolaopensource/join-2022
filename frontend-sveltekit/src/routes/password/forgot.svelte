<script lang="ts">
	import { goto } from '$app/navigation';
	import { post, endpoints } from '$lib/requestUtils';

	import { createForm } from 'svelte-forms-lib';
	import { f } from 'shared';

	//

	import { OutsideTitle } from '$lib/components';

	import {
		Form,
		TextField,
		SubmitButton,
		FormError,
		setFormError
	} from '$lib/components/form';

	import { icons } from '$lib/icons';

	//

	async function onSubmit(values: f.loginEmail.leBody) {
		try {
			// Sending the request to the server
			await post(fetch, endpoints.forgotPassword, values);
			// If response is ok we send the user to a confirmation message
			goto('/password/forgotconfirm');
		} catch (err) {
			setFormError(err.message);
		}
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
