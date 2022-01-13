<script lang="ts">
	// Here we check if the user is logged otherwise we send it away
	import userStore from '$lib/stores/userStore';
	import type { User } from '$lib/types';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import NavbarMain from '$lib/components/navbarMain.svelte';
	import { variables } from '$lib/variables';

	// Si serve usare per "nascondere" lo slot fino a quando il caricamento non è completo
	let loading = true;

	// Quando il componente viene chiamato:
	onMount(async () => {
		// Check if 'token' exists in localStorage
		if (!localStorage.getItem('token')) {
			loading = false;
			goto('/');
			// return { props: { user: null } }; // ← a che serve sta roba?
		}

		// Fetch the user from strapi
		const res = await fetch(variables.backendUrl + '/auth/me', {
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
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
