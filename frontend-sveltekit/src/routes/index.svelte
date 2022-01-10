<script lang="ts">
	import { goto } from '$app/navigation';
	import { post, browserSet } from '$lib/helpers/requestUtils';
	import { variables } from '$lib/variables';

	import OutsideTitle from '$lib/components/outsideTitle.svelte';
	import Button from '$lib/components/button.svelte';
	import InputText from '$lib/components/inputText.svelte';
	import FormGroup from '$lib/components/formGroup.svelte';
	import Form from '$lib/components/form.svelte';
	import FormError from '$lib/components/formError.svelte';

	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';

	import { icons } from '$lib/icons';

	// Creating form
	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: {
			email: ''
		},
		validationSchema: yup.object().shape({
			email: yup.string().email().required()
		}),
		onSubmit: (values) => {
			checkEmail();
		}
	});

	async function checkEmail() {
		try {
			// We send the email
			// IMPORTANT! Since post is an async function, we need to put await before
			// POST function throws an error if something goes wrong
			const data = await post(fetch, variables.backendUrl + '/checkEmail', {
				email: $form.email
			});
			console.log(data);

			// - we store email and username in localstorage
			browserSet(variables.localStorage.email, data.email);
			browserSet(variables.localStorage.username, data.username);
			// - redirect the user to the password
			goto('/login/password');
		} catch (err) {
			errorMsg = err.message;
		}
	}

	// This is one final error message for the result of the request
	let errorMsg = '';
</script>

<!-- Markup -->

<OutsideTitle>Login</OutsideTitle>

<Form on:submit={handleSubmit}>
	<FormError {errorMsg} />
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
