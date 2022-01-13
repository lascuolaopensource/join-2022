<script lang="ts">
	// Here we check if the user is logged otherwise we send it away
	import userStore from '$lib/stores/userStore';
	import type { User } from '$lib/requestUtils/types';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import { createAuthorizationHeader } from '$lib/requestUtils/authorizationHeader';
	import { localStorageGet } from '$lib/helpers/localStorageOps';
	import { endpoints } from '$lib/requestUtils/endpoints';

	import NavbarMain from '$lib/components/navbarMain.svelte';

	//

	// Si serve usare per "nascondere" lo slot fino a quando il caricamento non è completo
	let loading = true;

	// Quando il componente viene chiamato:
	onMount(async () => {
		// Check if 'token' exists in localStorage
		if (!localStorageGet('token')) {
			loading = false;
			goto('/');
			// return { props: { user: null } }; // ← a che serve sta roba?
		}

		// Fetch the user from strapi
		const res = await fetch(endpoints.me, {
			headers: {
				Authorization: createAuthorizationHeader(localStorageGet('token'))
			}
		});

		// Redirect if we get unauthorized error
		if (res.status == 401) {
			goto('/');
		}
		// Else we set the user in store
		else {
			const user: User = await res.json();
			loading = false;
			if (res.ok) {
				$userStore = user;
			}
		}
	});
</script>

{#if loading}
	<p>loading...</p>
{:else}
	<NavbarMain />
	<!-- Non veramente sicuro di questo ↓, ma dovrebbe andare -->
	{#if $userStore}
		<slot />
	{:else}
		<p>Maybe something's wrong?</p>
	{/if}
{/if}
