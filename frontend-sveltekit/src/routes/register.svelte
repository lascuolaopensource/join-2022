<script lang="ts">
	import { goto } from '$app/navigation';

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
			goto('/login');
		}
		// Else we update the error variables
		else {
			const data: { message: { messages: { message: string }[] }[] } = await res.json();
			error = true;
			error_msg = data.message[0].messages[0].message;
		}
	}
</script>

<h1>This is the registration page!</h1>
<form on:submit|preventDefault={registerUser}>
	<!-- Error message in case something goes wrong -->
	{#if error}
		<div>
			{error_msg}
		</div>
	{/if}
	<!-- The form -->
	<input bind:value={username} type="text" placeholder="username" required />
	<input bind:value={email} type="email" placeholder="email" required />
	<input bind:value={password} type="password" placeholder="password" required />
	<button type="submit">Register!</button>
</form>

<style>
	form {
		display: flex;
		flex-flow: column nowrap;
		width: 400px;
	}
	input {
		margin-bottom: 10px;
	}
</style>
