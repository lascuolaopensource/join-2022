<script lang="ts">
	import user from '$lib/stores/userStore';
	import { goto } from '$app/navigation';
	import { post } from '$lib/helpers/requestUtils';
	import { temporaryEmailStore } from '$lib/stores/temporaryEmailStore';

	import Button from '$lib/components/button.svelte';
	import InputText from '$lib/components/inputText.svelte';
	import FormGroup from '$lib/components/formGroup.svelte';
	import Form from '$lib/components/form.svelte';

	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';

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
				identifier: $temporaryEmailStore,
				password: $form.password
			});
			// Then, if successful:
			// - we store the token in localstorage
			localStorage.setItem('token', data.jwt);
			// - we update the user store
			$user = data.user;
			// - we empty the temporary email store
			temporaryEmailStore.set('');
			// - redirect the user inside
			goto('/inside');
		} catch (err) {
			alert(err.message);
		}
	}
</script>

<!-- Markup -->
<h1>Login: Password</h1>
<Form on:submit={handleSubmit}>
	<FormGroup>
		<InputText
			id="password"
			type="password"
			label="Password"
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
