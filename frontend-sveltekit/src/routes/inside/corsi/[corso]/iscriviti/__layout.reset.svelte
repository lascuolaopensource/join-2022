<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import { headersAuth, endpoints } from '$lib/requestUtils';
	import { lsGetToken } from '$lib/localStorageUtils';
	import { user } from '$lib/stores';

	import { Loading } from '$lib/components';

	//

	// Si serve usare per "nascondere" lo slot fino a quando il caricamento non è completo
	let loading = true;

	// Quando il componente viene chiamato:
	onMount(async () => {
		// Check if JWT token exists in localStorage
		if (lsGetToken()) {
			// Fetch the user from strapi using the token (it's inside headersAuth())
			const res = await fetch(endpoints.me, {
				headers: headersAuth()
			});
			// Saving user in store if found
			if (res.ok) {
				const data = await res.json();
				$user = data;
			}
		}

		// In any case, loading ends
		loading = false;
	});
</script>

<!--  -->

{#if loading}
	<Loading />
{:else}
	<div class="container">
		<slot />
	</div>
{/if}
