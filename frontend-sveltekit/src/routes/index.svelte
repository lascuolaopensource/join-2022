<script lang="ts">
	import type { User } from '$lib/types';
	import { goto } from '$app/navigation';
	import user from '$lib/stores/userStore';

	import Button from '$lib/components/button.svelte';

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

<!-- /* Markup */ -->

<div class="flex-center mb-8">
	<h1>Join / Login</h1>
</div>

<!-- Error message in case something goes wrong -->
{#if error}
	<div class="error">
		{error_msg}
	</div>
{/if}

<!-- The login form -->
<form on:submit|preventDefault={login}>
	<input bind:value={email} type="email" placeholder="email" required />
	<input bind:value={password} type="password" placeholder="password" required />
	<Button type="submit">Login!</Button>
</form>

<!-- Registration link -->
<div class="flex-center mt-8">
	<p>Non hai un account?</p>
	<a href="/register" class="ml-1">Registrati!</a>
</div>

<!-- /* Style */ -->
<style>
	form {
		display: flex;
		flex-flow: column nowrap;
		row-gap: var(--item-padding);
	}

	.flex-center {
		display: flex;
		flex-flow: row nowrap;
		width: 100%;
		justify-content: center;
		align-items: center;
	}
</style>
