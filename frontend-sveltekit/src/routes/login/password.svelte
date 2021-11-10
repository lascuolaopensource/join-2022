<script lang="ts">
	import user from '$lib/stores/userStore';

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
</script>

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
