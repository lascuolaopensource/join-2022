<script lang="ts">
	import user from '$lib/stores/userStore';
	import { goto } from '$app/navigation';

	import post from '$lib/requestUtils/post';
	import { endpoints } from '$lib/requestUtils/endpoints';
	import { lsKeys } from '$lib/localStorageUtils/keys';
	import { lsGet, lsRemove, lsSet } from '$lib/localStorageUtils/ops';

	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';

	import OutsideBacklink from '$lib/components/outsideBacklink.svelte';
	import OutsideTitle from '$lib/components/outsideTitle.svelte';
	import Button from '$lib/components/button.svelte';
	import InputText from '$lib/components/inputText.svelte';
	import FormGroup from '$lib/components/formGroup.svelte';
	import Form from '$lib/components/form.svelte';
	import FormError from '$lib/components/formError.svelte';

	import { icons } from '$lib/icons';

	//

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: {
			password: ''
		},
		validationSchema: yup.object().shape({
			password: yup.string().required()
		}),
		onSubmit: (values) => {
			errorMsg = '';
			login();
		}
	});

	//

	async function login() {
		try {
			// We send the login data
			const data = await post(fetch, endpoints.login, {
				identifier: lsGet(lsKeys.email),
				password: $form.password
			});
			// Then, if successful:
			// - we store the token in localstorage
			lsSet('token', data.jwt);
			// - we update the user store
			$user = data.user;
			// - we empty the temporary localstorage variables
			lsRemove(lsKeys.email);
			lsRemove(lsKeys.username);
			// - redirect the user inside
			goto('/inside');
		} catch (err) {
			// Soluzione temporanea
			if (err.message == 'Invalid identifier or password') {
				errorMsg = 'Password errata';
			} else {
				errorMsg = err.message;
			}
		}
	}

	//

	// This is one final error message for the result of the request
	let errorMsg = '';
</script>

<!-- --- Markup --- -->

<OutsideBacklink href="/" label="Login" />

<OutsideTitle>
	Ciao {lsGet(lsKeys.username)}!
</OutsideTitle>

<Form on:submit={handleSubmit}>
	<FormError {errorMsg} />
	<FormGroup>
		<InputText
			id="password"
			type="password"
			label="Password"
			labelIcon={icons.fields.password}
			placeholder="Inserisci la tua password"
			required
			link={{
				label: 'Password dimenticata?',
				href: '/password/forgot'
			}}
			tabindex={1}
			bind:value={$form.password}
			on:blur={handleChange}
			error={$errors.password}
		/>
	</FormGroup>
	<Button type="submit" tabindex={2}>Avanti</Button>
</Form>
