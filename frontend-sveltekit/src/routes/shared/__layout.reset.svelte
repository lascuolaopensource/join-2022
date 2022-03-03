<script lang="ts">
	import { onMount } from 'svelte';

	import { req } from '$lib/requestUtils';
	import { lsGetToken } from '$lib/localStorageUtils';
	import { user } from '$lib/stores';

	import { Loading } from '$lib/components';

	//

	// Si serve usare per "nascondere" lo slot fino a quando il caricamento non è completo
	let loading = true;

	// Quando il componente viene chiamato la prima volta:
	onMount(async () => {
		try {
			// Check if JWT token exists in localStorage
			// Then, check if user exists and save in store
			if (lsGetToken()) {
				const res = await req.me(fetch);
				$user = res;
			}
		} finally {
			// In any case, loading ends
			loading = false;
		}
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
