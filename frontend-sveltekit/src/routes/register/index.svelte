<script lang="ts">
	import { goto } from '$app/navigation';
	import { post } from '$lib/helpers/requestUtils';

	import Button from '$lib/components/button.svelte';
	import InputText from '$lib/components/inputText.svelte';
	import FormGroup from '$lib/components/formGroup.svelte';
	import Form from '$lib/components/form.svelte';
	import FormError from '$lib/components/formError.svelte';

	// Form data needed for the registration
	let username: string = '';
	let email: string = '';
	let password: string = '';

	// Helper variables to check for error and store it
	let error: boolean = false;
	let error_msg: string = '';

	// Registers a user
	async function registerUser() {
		try {
			// IMPORTANT! Since post is an async function, we need to put await before
			await post(fetch, 'http://localhost:1337/auth/local/register', {
				username: username,
				email: email,
				password: password
			});
			// If successful, we redirect
			goto('/register/thanks');
		} catch (err) {
			error = true;
			error_msg = err.message;
		}
	}
</script>

<!-- Markup -->

<!-- Registration link -->
<div>
	<a class="back" href="/">← Login</a>
</div>

<h1>Registrati!</h1>
<Form on:submit={registerUser}>
	<!-- Error message in case something goes wrong -->
	{#if error}
		<FormError>
			{error_msg}
		</FormError>
	{/if}
	<!-- Rest of the form -->
	<FormGroup>
		<InputText
			type="text"
			bind:value={username}
			label="Username"
			placeholder="Inserisci il tuo username"
			required
		/>
		<InputText
			type="email"
			bind:value={email}
			label="Email"
			placeholder="Inserisci la tua email"
			required
		/>
		<InputText
			type="password"
			bind:value={password}
			label="Password"
			placeholder="Inserisci la tua password"
			required
		/>
	</FormGroup>
	<Button type="submit">Registrati!</Button>
</Form>

<style>
	div {
		width: 100%;
		padding-bottom: var(--s-4);
	}
</style>
