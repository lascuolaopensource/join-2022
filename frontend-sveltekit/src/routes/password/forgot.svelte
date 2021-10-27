<script lang="ts">
	import { goto } from '$app/navigation';
	import { post } from '$lib/helpers/requestUtils';

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
			error = true;
			error_msg = err.message;
		}
	}

	// If you got an error, and you start typing again
	// Then the error should go away
	function hideError() {
		if (error) {
			error = false;
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
	<!-- Error message in case something goes wrong -->
	<FormError show={error}>{error_msg}</FormError>
	<!-- Rest of the form -->
	<FormGroup>
		<InputText
			type="email"
			bind:value={email}
			label="Email"
			placeholder="Inserisci la tua email"
			required
			on:input={hideError}
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
