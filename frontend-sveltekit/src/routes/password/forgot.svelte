<script lang="ts">
	import { goto } from '$app/navigation';
	import { post } from '$lib/helpers/requestUtils';

	import Button from '$lib/components/button.svelte';
	import InputText from '$lib/components/inputText.svelte';
	import FormGroup from '$lib/components/formGroup.svelte';
	import Form from '$lib/components/form.svelte';

	// Form data needed for the registration
	let email: string = '';

	// Registers a user
	async function resetPassword() {
		try {
			// This function:
			// - Returns if it's all good
			// - Throws error if something's wrong
			await post(fetch, 'http://localhost:1337/auth/forgot-password', {
				email
			});
			// If response is ok we send the user to some confirmation
			goto('/password/forgotconfirm');
		} catch (err) {
			//
		}
	}
</script>

<!-- Markup -->

<!-- Registration link -->
<div>
	<a href="/">← Login</a>
</div>

<h1>Password reset</h1>
<Form on:submit={resetPassword}>
	<!-- Rest of the form -->
	<FormGroup>
		<InputText
			id="email"
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
		padding-bottom: var(--s-2);
	}
</style>
