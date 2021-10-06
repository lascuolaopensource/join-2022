<script lang="ts">
	import { goto } from '$app/navigation';

	let username: string = '';
	let email: string = '';
	let password: string = '';

	let error: boolean = false;
	let error_msg: string = '';

	async function registerUser() {
		error = false;

		const res = await fetch('http://localhost:1337/auth/local/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: JSON.stringify({
				name: username,
				username: username,
				email: email,
				password: password
			})
		});

		if (res.ok) {
			goto('/login');
		}
		//
		else {
			const data: { message: { messages: { message: string }[] }[] } = await res.json();
			if (data?.message?.[0]?.messages?.[0]?.message) {
				alert(data.message[0].messages[0].message);
			}
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
