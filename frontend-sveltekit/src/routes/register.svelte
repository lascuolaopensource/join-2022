<script lang="ts">
	import { goto } from '$app/navigation';

	import Button from '$lib/components/button.svelte';
	import InputText from '$lib/components/inputText.svelte';
	import FormGroup from '$lib/components/formGroup.svelte';
	import Form from '$lib/components/form.svelte';
	import FormError from '$lib/components/formError.svelte';

	// Form data needed for the registration
	let username: string = '';
	let email: string = '';
	let password: string = '';

	// Helper variables to store and check for errors
	let error: boolean = false;
	let error_msg: string = '';

	// Registers a user
	async function registerUser() {
		// We first post a request to the register endpoint
		const res = await fetch('http://localhost:1337/auth/local/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: JSON.stringify({
				username: username,
				email: email,
				password: password
			})
		});

		// If response is okay we move to login
		// In future this will be the "verify your email" page
		if (res.ok) {
			goto('/');
		}
		// Else we update the error variables
		else {
			const data: { message: { messages: { message: string }[] }[] } = await res.json();
			error = true;
			if (data?.message?.[0]?.messages?.[0]?.message) {
				error_msg = data.message[0].messages[0].message;
			} else {
				error_msg = 'An unknown error occurred';
			}
		}
	}
</script>

<!-- Markup -->

<!-- Registration link -->
<div>
	<a href="/">← Login</a>
</div>

<Form on:submit={registerUser} title="Join / Registrati">
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
		padding: var(--s-4) var(--s-4) 0 var(--s-4);
	}
</style>
