<!-- Here we check if the user is logged otherwise we send it away -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import { headersAuth, endpoints } from '$lib/requestUtils';
	import { lsGetToken } from '$lib/localStorageUtils';
	import userStore from '$lib/stores/userStore';

	//

	import NavbarMain from '$lib/components/navbarMain.svelte';
	import Loading from '$lib/components/loading.svelte';

	//

	// Si serve usare per "nascondere" lo slot fino a quando il caricamento non è completo
	let loading = true;

	// Quando il componente viene chiamato:
	onMount(async () => {
		// Check if JWT token exists in localStorage, otherwise we send away
		if (!lsGetToken()) {
			goto('/');
		}

		// Fetch the user from strapi using the token (it's inside headersAuth())
		const res = await fetch(endpoints.me, {
			headers: headersAuth()
		});

		// Redirect if response is not ok
		if (!res.ok) {
			goto('/');
		}
		// Else we set the user in store and loading ends
		else {
			const user = await res.json();
			$userStore = user;
			loading = false;
		}
	});
</script>

{#if loading}
	<Loading />
{:else}
	<NavbarMain />
	<slot />
{/if}
