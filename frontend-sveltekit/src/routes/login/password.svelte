<script lang="ts">
	import user from '$lib/stores/userStore';
	import { goto } from '$app/navigation';
	import { post } from '$lib/helpers/requestUtils';
	import { localStorageEmailKey } from '$lib/stores/temporaryEmailStore';

	import OutsideBacklink from '$lib/components/outsideBacklink.svelte';
	import OutsideTitle from '$lib/components/outsideTitle.svelte';
	import Button from '$lib/components/button.svelte';
	import InputText from '$lib/components/inputText.svelte';
	import FormGroup from '$lib/components/formGroup.svelte';
	import Form from '$lib/components/form.svelte';

	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';

	import { icons } from '$lib/icons';

	const { form, errors, state, handleChange, handleSubmit } = createForm({
		initialValues: {
			password: ''
		},
		validationSchema: yup.object().shape({
			password: yup.string().required()
		}),
		onSubmit: (values) => {
			login();
		}
	});

	async function login() {
		try {
			// We send the login data
			// IMPORTANT! Since post is an async function, we need to put await before
			// POST function throws an error if something goes wrong
			const data = await post(fetch, 'http://localhost:1337/auth/local', {
				identifier: localStorage.getItem(localStorageEmailKey),
				password: $form.password
			});
			// Then, if successful:
			// - we store the token in localstorage
			localStorage.setItem('token', data.jwt);
			// - we update the user store
			$user = data.user;
			// - we empty the temporary email store
			localStorage.set(localStorageEmailKey, '');
			// - redirect the user inside
			goto('/inside');
		} catch (err) {
			// Just a workaround for now
			if (err.message == 'Identifier or password invalid.') {
				errors.set({ password: 'Password errata' });
			} else {
				alert(err.message);
			}
		}
	}
</script>

<!-- Markup -->

<OutsideBacklink href="/" label="Login" />

<OutsideTitle>
	Ciao {localStorage.getItem(localStorageEmailKey)}!
</OutsideTitle>

<Form on:submit={handleSubmit}>
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
