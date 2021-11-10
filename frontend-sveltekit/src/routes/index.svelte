<script lang="ts">
	import user from '$lib/stores/userStore';
	import { goto } from '$app/navigation';
	import { post } from '$lib/helpers/requestUtils';

	import Button from '$lib/components/button.svelte';
	import InputText from '$lib/components/inputText.svelte';
	import FormGroup from '$lib/components/formGroup.svelte';
	import Form from '$lib/components/form.svelte';

	//

	let email = '';
	// let password = '';

	let error: boolean = false;
	let error_msg: string = '';

	//

	// async function login() {
	// 	try {
	// 		// We send the login data
	// 		// IMPORTANT! Since post is an async function, we need to put await before
	// 		// POST function throws an error if something goes wrong
	// 		const data = await post(fetch, 'http://localhost:1337/auth/local', {
	// 			identifier: email,
	// 			password
	// 		});
	// 		// Then, if successful:
	// 		// - we store the token in localstorage
	// 		localStorage.setItem('token', data.jwt);
	// 		// - we update the user store
	// 		$user = data.user;
	// 		// - redirect the user inside
	// 		goto('/inside');
	// 	} catch (err) {
	// 		error = true;
	// 		error_msg = err.message;
	// 	}
	// }

	async function checkEmail() {
		try {
			// Asking the server if the email exists
			const res: { exists: boolean } = await post(
				fetch,
				`http://localhost:1337/exists`,
				{
					email
				}
			);
			// Then
			if (res.exists) {
				goto('/login/password');
			} else {
				throw new Error('This email does not exist');
			}
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
<h1>Login</h1>
<Form on:submit={checkEmail}>
	<FormGroup>
		<InputText
			id="email"
			type="email"
			bind:value={email}
			label="Email"
			placeholder="Inserisci la tua email"
			required
			tabindex={1}
			on:input={hideError}
		/>
		<!-- <InputText
			type="password"
			bind:value={password}
			label="Password"
			placeholder="Inserisci la tua password"
			required
			link={{
				label: 'Password dimenticata?',
				href: '/password/forgot'
			}}
			tabindex={2}
			on:input={hideError}
		/> -->
	</FormGroup>
	<Button type="submit" tabindex={2}>Avanti</Button>
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
