<script lang="ts">
	import { goto } from '$app/navigation';
	import { req } from '$lib/requestUtils';

	import { createForm } from 'svelte-forms-lib';
	import { endpoints as e } from 'shared';
	import { lsGet, lsKeys } from '$lib/localStorageUtils';

	//

	import { Link, Title } from '$lib/components';

	import {
		Form,
		TextField,
		SubmitButton,
		FormError,
		setFormError
	} from '$lib/components/form';

	import { icons } from '$lib/icons';

	//

	async function onSubmit(values: e.LoginEmailReq) {
		try {
			// Sending the request to the server
			await req.forgotPassword(values);
			// If response is ok we send the user to a confirmation message
			await goto('/password/forgotconfirm');
		} catch (err) {
			setFormError(err.message);
		}
	}

	const initialValues = e.LoginEmailValues;
	// Adding email from localstorage
	if (lsGet(lsKeys.email)) {
		initialValues.email = lsGet(lsKeys.email);
	}

	const formContext = createForm({
		initialValues,
		validationSchema: e.LoginEmailSchema,
		onSubmit
	});
</script>

<!-- --- Markup --- -->

<Link href="/" backlink margin>Login</Link>

<Title margin>Resetta la password</Title>

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
