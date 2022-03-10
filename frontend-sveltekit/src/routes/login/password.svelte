<script lang="ts">
	import { goto } from '$app/navigation';

	import { req } from '$lib/requestUtils';
	import { lsGet, lsRemove, lsSet, lsKeys } from '$lib/localStorageUtils';

	import { createForm } from 'svelte-forms-lib';
	import { f } from 'shared';

	//

	import { OutsideTitle } from '$lib/components';

	import { Form, TextField, SubmitButton, FormError, setFormError } from '$lib/components/form';

	import { icons } from '$lib/icons/icons.svelte';

	//

	async function onSubmit(values: f.loginPassword.lpType) {
		try {
			// We send the login data
			const res = await req.login({
				identifier: lsGet(lsKeys.email),
				password: values.password
			});
			// Then, if successful:
			// - we store the token in localstorage
			lsSet('token', res.jwt);
			// - we empty the temporary localstorage variables
			lsRemove(lsKeys.email);
			lsRemove(lsKeys.name);
			// - redirect the user inside
			await goto('/inside');
		} catch (err) {
			// Soluzione temporanea
			if (err.message == 'Invalid identifier or password') {
				setFormError('Password errata');
			} else {
				setFormError(err.message);
			}
		}
	}

	const formContext = createForm({
		initialValues: f.loginPassword.lpValues,
		validationSchema: f.loginPassword.lpSchema,
		onSubmit
	});
</script>

<!-- --- Markup --- -->

<a href="/" class="backlink">Login</a>

<OutsideTitle>
	Ciao {lsGet(lsKeys.name)}!
</OutsideTitle>

<Form {formContext}>
	<TextField
		name="password"
		type="password"
		placeholder="Inserisci la tua password"
		labelText="Password"
		labelIcon={icons.fields.password}
		labelLink={{
			text: 'Password dimenticata?',
			href: '/password/forgot'
		}}
	/>
	<FormError />
	<SubmitButton>Login</SubmitButton>
</Form>
