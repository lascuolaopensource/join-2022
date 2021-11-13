<script lang="ts">
	import { variables } from '$lib/variables'; //import environment variables (backendUrl)
	import { goto } from '$app/navigation';
	import { localStorageEmailKey } from '$lib/stores/temporaryEmailStore';

	import OutsideTitle from '$lib/components/outsideTitle.svelte';
	import Button from '$lib/components/button.svelte';
	import InputText from '$lib/components/inputText.svelte';
	import FormGroup from '$lib/components/formGroup.svelte';
	import Form from '$lib/components/form.svelte';

	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import { createExistsTest } from '$lib/validationTests';

	import { icons } from '$lib/icons';

	// Creating form

	const { form, errors, state, handleChange, handleSubmit } = createForm({
		initialValues: {
			email: ''
		},
		validationSchema: yup.object().shape({
			email: yup
				.string()
				.email()
				.required()
				.test({
					name: 'emailExists',
					message: "L'email non esiste",
					test: createExistsTest('email')
				})
		}),
		onSubmit: (values) => {
			// We save the email in the localstorage
			localStorage.setItem(localStorageEmailKey, $form.email);
			// Then we redirect
			goto('/login/password');
		}
	});
</script>

<!-- Markup -->

<OutsideTitle>Login</OutsideTitle>

<Form on:submit={handleSubmit}>
	<FormGroup>
		<InputText
			id="email"
			type="email"
			label="Email"
			labelIcon={icons.fields.email}
			placeholder="Inserisci la tua email"
			required
			tabindex={1}
			bind:value={$form.email}
			on:blur={handleChange}
			error={$errors.email}
		/>
	</FormGroup>
	<Button type="submit" tabindex={2}>Avanti</Button>
</Form>

<!-- Registration link -->
<div class="message">
	<p>Non hai un account?</p>
	<a href="/register" class="registrati">Registrati!</a>
</div>

<!-- /* Style */ -->
<style>
	.message {
		display: flex;
		flex-flow: row nowrap;
		width: 100%;
		justify-content: center;
		align-items: center;
		margin-top: var(--s-4);
	}

	.registrati {
		margin-left: var(--s-0);
	}
</style>
