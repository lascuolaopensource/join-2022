<script lang="ts">
	import { goto } from '$app/navigation';

	import Button from '$lib/components/button.svelte';
	import InputText from '$lib/components/inputText.svelte';
	import FormGroup from '$lib/components/formGroup.svelte';
	import Form from '$lib/components/form.svelte';
	import FormError from '$lib/components/formError.svelte';

	// Form data needed for the registration
	let email: string = '';

	// Helper variables to store and check for errors
	let error: boolean = false;
	let error_msg: string = '';

	// Registers a user
	async function resetPassword() {
		const res = await fetch('http://localhost:1337/auth/forgot-password', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: JSON.stringify({ email })
		});
		// If response is ok we send the user to some confirmation
		if (res.ok) {
			goto('/password/forgotconfirm');
		}
		// We have to alert the user that something went wrong
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

<Form on:submit={resetPassword} title="Join / Password reset">
	<!-- Error message in case something goes wrong -->
	{#if error}
		<FormError>
			{error_msg}
		</FormError>
	{/if}
	<!-- Rest of the form -->
	<FormGroup>
		<InputText
			type="email"
			bind:value={email}
			label="Email"
			placeholder="Inserisci la tua email"
			required
		/>
	</FormGroup>
	<Button type="submit">Recupera password</Button>
</Form>

<style>
	div {
		width: 100%;
		padding-bottom: var(--s-4);
	}
</style>
