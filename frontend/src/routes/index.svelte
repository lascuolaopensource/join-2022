<script lang="ts">
	import { goto } from '$app/navigation';

	import { lsKeys, lsSet } from '$lib/localStorageUtils';
	import { req } from '$lib/requestUtils';

	import { createForm } from 'svelte-forms-lib';
	import { endpoints as e } from 'shared';

	//

	import { OutsideTitle } from '$lib/components';
	import {
		Form,
		FormError,
		TextField,
		SubmitButton,
		setFormError
	} from '$lib/components/form';
	import { icons } from '$lib/icons';
	import { Link } from '$lib/ui';

	//

	async function onSubmit(values: e.LoginEmailReq) {
		// This function checks if email exists
		try {
			const res = await req.loginEmail(values);
			// We store email and username in localstorage
			lsSet(lsKeys.email, res.email);
			lsSet(lsKeys.name, res.name);
			// And redirect the user to the password
			await goto('/login/password');
		} catch (e: any) {
			if ('message' in e) {
				const message =
					e?.message == '404' ? "L'email non è corretta" : e.message;
				setFormError(message);
			}
		}
	}

	const formContext = createForm({
		initialValues: e.LoginEmailValues,
		validationSchema: e.LoginEmailSchema,
		onSubmit
	});
</script>

<!--  -->

<OutsideTitle>Login</OutsideTitle>

<Form {formContext}>
	<TextField
		name="email"
		type="email"
		placeholder="Inserisci la tua email"
		labelText="Email"
		labelIcon={icons.fields.email}
	/>
	<FormError />
	<SubmitButton>Avanti</SubmitButton>
</Form>

<p>
	Non hai un account?
	<span class="ml-1"><Link href="/register">Registrati!</Link></span>
</p>
