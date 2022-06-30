<script lang="ts">
	import { goto } from '$app/navigation';

	import { req } from '$lib/requestUtils';
	import { lsGet, lsRemove, lsSet, lsKeys } from '$lib/localStorageUtils';

	import { createForm } from 'svelte-forms-lib';
	import { endpoints as e } from 'shared';

	//

	import { Link, Title } from '$lib/ui';

	import {
		Form,
		TextField,
		SubmitButton,
		FormError,
		setFormError
	} from '$lib/components/form';

	import { icons } from '$lib/icons';

	//

	async function onSubmit(values: e.LoginReq) {
		try {
			// We send the login data
			const res = await req.login(values);
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

	const initialValues = e.LoginValues;
	initialValues.identifier = lsGet(lsKeys.email);

	const formContext = createForm({
		initialValues,
		validationSchema: e.LoginSchema,
		onSubmit
	});
</script>

<!-- --- Markup --- -->

<Link href="/" backlink margin>Login</Link>

<Title margin>
	Ciao {lsGet(lsKeys.name)}!
</Title>

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
