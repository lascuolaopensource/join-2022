<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import Button from '$lib/components/button.svelte';
	import InputText from '$lib/components/inputText.svelte';
	import FormGroup from '$lib/components/formGroup.svelte';
	import Form from '$lib/components/form.svelte';
	import FormError from '$lib/components/formError.svelte';

	// Form data needed for the reset
	// These two have to match!
	let password: string = '';
	let passwordConfirmation: string = '';

	// Helper variables to store and check for errors
	let error: boolean = false;
	let error_msg: string = '';

	// ***** //

	// IMPORTANT!!!!
	// To redirect, we could check if page has code query param
	console.log($page.query.get('code'));

	// ***** //

	// Registers a user
	async function resetPassword() {
		const res = await fetch('http://localhost:1337/auth/reset-password', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				code: $page.query.get('code'),
				password,
				passwordConfirmation
			})
		});
		// If response is ok we send the user to some confirmation
		if (res.ok) {
			goto('/password/resetconfirm');
		}
		// // We have to alert the user that something went wrong
		else {
			const data: { message: { messages: { message: string }[] }[] } =
				await res.json();
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

<h1>Cambio password</h1>
<Form on:submit={resetPassword}>
	<!-- Error message in case something goes wrong -->
	<FormError show={error}>{error_msg}</FormError>
	<!-- Rest of the form -->
	<FormGroup>
		<InputText
			type="password"
			bind:value={password}
			label="Password"
			placeholder="Inserisci la nuova password"
			required
		/>
		<InputText
			type="password"
			bind:value={passwordConfirmation}
			label="Password"
			placeholder="Conferma la nuova password"
			required
		/>
	</FormGroup>
	<Button type="submit">Reset password</Button>
</Form>

<style>
	div {
		width: 100%;
		padding-bottom: var(--s-2);
	}
</style>
