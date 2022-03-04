<script lang="ts">
	import { goto } from '$app/navigation';

	import { lsKeys, lsSet } from '$lib/localStorageUtils';
	import { req } from '$lib/requestUtils';

	import { createForm } from 'svelte-forms-lib';
	import { f } from 'shared';

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

	//

	async function onSubmit(values: f.loginEmail.leType) {
		// This function checks if email exists
		try {
			const res = await req.loginEmail(values);
			// We store email and username in localstorage
			lsSet(lsKeys.email, res.email);
			lsSet(lsKeys.name, res.name);
			// And redirect the user to the password
			await goto('/login/password');
		} catch (e) {
			if (e?.message == '404') {
				setFormError("L'email non è corretta");
			} else {
				throw e;
			}
		}
	}

	const formContext = createForm({
		initialValues: f.loginEmail.leValues,
		validationSchema: f.loginEmail.leSchema,
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

<div class="message">
	<p>Non hai un account?</p>
	<a href="/register" class="registrati">Registrati!</a>
</div>

<!-- --- Style --- -->
<style>
	.message {
		display: flex;
		flex-flow: row nowrap;
		width: 100%;
		justify-content: center;
		align-items: center;
		margin-top: var(--s-6);
	}

	.registrati {
		margin-left: var(--s-0);
	}
</style>
