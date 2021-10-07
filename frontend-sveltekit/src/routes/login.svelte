<script lang="ts">
	import type { User } from '$lib/types';
	import { goto } from '$app/navigation';
	import user from '$lib/stores/userStore';

	let email = '';
	let password = '';

	let error: boolean = false;
	let error_msg: string = '';

	async function login() {
		const res = await fetch('http://localhost:1337/auth/local', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: JSON.stringify({ identifier: email, password })
		});
		if (res.ok) {
			const data: { user: User; jwt: string } = await res.json();
			localStorage.setItem('token', data.jwt);
			if (data) {
				$user = data.user;
				goto('/inside');
			}
		} else {
			const data: { message: { messages: { message: string }[] }[] } = await res.json();
			if (data?.message?.[0]?.messages?.[0]?.message) {
				alert(data.message[0].messages[0].message);
			}
		}
	}
</script>

<h1>Er login</h1>
<form on:submit|preventDefault={login}>
	<!-- Error message in case something goes wrong -->
	{#if error}
		<div>
			{error_msg}
		</div>
	{/if}
	<!-- The form -->
	<input bind:value={email} type="email" placeholder="email" required />
	<input bind:value={password} type="password" placeholder="password" required />
	<button type="submit">Login!</button>
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
