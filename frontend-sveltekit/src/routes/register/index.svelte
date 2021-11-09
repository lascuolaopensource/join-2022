<script lang="ts">
	import { goto } from '$app/navigation';
	import { post } from '$lib/helpers/requestUtils';

	import Button from '$lib/components/button.svelte';
	import InputText from '$lib/components/inputText.svelte';
	import FormGroup from '$lib/components/formGroup.svelte';
	import Form from '$lib/components/form.svelte';

	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';

	// Creating form

	// Email validation
	const emailExistsTest = async (value, testContext) => {
		const res: { exists: boolean } = await post(
			fetch,
			`http://localhost:1337/exists`,
			{
				email: value
			}
		);
		return !res.exists;
	};

	const usernameExistsTest = async (value, testContext) => {
		const res: { exists: boolean } = await post(
			fetch,
			`http://localhost:1337/exists`,
			{
				username: value
			}
		);
		return !res.exists;
	};

	const { form, errors, state, handleChange, handleSubmit } = createForm({
		initialValues: {
			username: '',
			email: '',
			password: ''
		},
		validationSchema: yup.object().shape({
			username: yup.string().required().test({
				name: 'usernameExists',
				message: 'L username esiste già',
				test: usernameExistsTest
			}),
			email: yup.string().email().required().test({
				name: 'emailExists',
				message: 'L email esiste già',
				test: emailExistsTest
			}),
			password: yup.string().min(8).max(52).required()
		}),
		onSubmit: (values) => {
			registerUser(values);
		}
	});

	// Registers a user
	async function registerUser(body: {
		username: string;
		email: string;
		password: string;
	}) {
		try {
			// IMPORTANT! Since post is an async function, we need to put await before
			await post(fetch, 'http://localhost:1337/auth/local/register', body);
			// If successful, we redirect
			goto('/register/thanks');
		} catch (err) {
			alert(err.message);
		}
	}
</script>

<!-- Markup -->

<!-- Registration link -->
<div>
	<a class="back" href="/">← Login</a>
</div>

<h1>Registrati!</h1>
<Form on:submit={handleSubmit}>
	<!-- Rest of the form -->
	<FormGroup>
		<InputText
			id="username"
			type="text"
			label="Username"
			placeholder="Inserisci il tuo username"
			required
			bind:value={$form.username}
			on:blur={handleChange}
			error={$errors.username}
		/>
		<InputText
			id="email"
			type="email"
			label="Email"
			placeholder="Inserisci la tua email"
			required
			bind:value={$form.email}
			on:blur={handleChange}
			error={$errors.email}
		/>
		<InputText
			id="password"
			type="password"
			label="Password"
			placeholder="Inserisci la tua password"
			required
			bind:value={$form.password}
			on:blur={handleChange}
			error={$errors.password}
		/>
	</FormGroup>
	<Button type="submit">Registrati!</Button>
</Form>

<style>
	div {
		width: 100%;
		padding-bottom: var(--s-2);
	}
</style>
