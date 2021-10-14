<script lang="ts">
	import type { User } from '$lib/types';
	import { goto } from '$app/navigation';
	import user from '$lib/stores/userStore';

	import Button from '$lib/components/button.svelte';
	import InputText from '$lib/components/inputText.svelte';
	import FormGroup from '$lib/components/formGroup.svelte';
	import Form from '$lib/components/form.svelte';
	import FormError from '$lib/components/formError.svelte';

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
<h1>Login</h1>
<Form on:submit={login}>
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
		<InputText
			type="password"
			bind:value={password}
			label="Password"
			placeholder="Inserisci la tua password"
			required
			link={{
				label: 'Password dimenticata?',
				href: '/password/forgot'
			}}
		/>
	</FormGroup>
	<Button type="submit">Login!</Button>
</Form>

<!-- Registration link -->
<div class="message flex-center">
	<p>Non hai un account?</p>
	<a href="/register" class="registrati">Registrati!</a>
</div>

<!-- /* Style */ -->
<style>
	.flex-center {
		display: flex;
		flex-flow: row nowrap;
		width: 100%;
		justify-content: center;
		align-items: center;
	}

	.message {
		margin-top: var(--s-4);
	}

	.registrati {
		margin-left: var(--s-0);
	}
</style>
