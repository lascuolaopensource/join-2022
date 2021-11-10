<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { post } from '$lib/helpers/requestUtils';

	import Button from '$lib/components/button.svelte';
	import InputText from '$lib/components/inputText.svelte';
	import FormGroup from '$lib/components/formGroup.svelte';
	import Form from '$lib/components/form.svelte';

	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import { passwordValidator } from '$lib/validationTests';

	const { form, errors, state, handleChange, handleSubmit } = createForm({
		initialValues: {
			password: '',
			passwordConfirm: ''
		},
		validationSchema: yup.object().shape({
			password: passwordValidator,
			passwordConfirm: passwordValidator.oneOf(
				[yup.ref('password'), null],
				'Passwords must match'
			)
		}),
		onSubmit: (values) => {
			resetPassword();
		}
	});

	// Resets password
	async function resetPassword() {
		try {
			const res = post(fetch, 'http://localhost:1337/auth/reset-password', {
				code: $page.query.get('code'),
				password: $form.password,
				passwordConfirmation: $form.passwordConfirm
			});
			// If response is ok we send the user to some confirmation
			goto('/password/resetconfirm');
		} catch (err) {
			alert(err.message);
		}
	}
</script>

<!-- Registration link -->
<div>
	<a href="/">← Login</a>
</div>

<h1>Cambio password</h1>
<Form on:submit={handleSubmit}>
	<!-- Rest of the form -->
	<FormGroup>
		<InputText
			id="password"
			type="password"
			label="Password"
			placeholder="Inserisci la nuova password"
			required
			tabindex={1}
			bind:value={$form.password}
			on:blur={handleChange}
			error={$errors.password}
		/>
		<InputText
			id="passwordConfirm"
			type="password"
			label="Password"
			placeholder="Conferma la nuova password"
			required
			tabindex={2}
			bind:value={$form.passwordConfirm}
			on:blur={handleChange}
			error={$errors.passwordConfirm}
		/>
	</FormGroup>
	<Button type="submit" tabindex={3}>Reset password</Button>
</Form>

<style>
	div {
		width: 100%;
		padding-bottom: var(--s-2);
	}
</style>
