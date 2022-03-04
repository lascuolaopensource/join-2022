<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import { lsGetToken } from '$lib/localStorageUtils';
	import { req } from '$lib/requestUtils';

	import { Loading, NavbarOutside } from '$lib/components';

	//

	// Questa variabile tiene traccia dello stato di caricamento
	let loading = true;

	// ON MOUNT (Quando il componente viene chiamato)
	onMount(async () => {
		// Prendiamo il token in localstorage
		// Se il token non c'è, significa automaticamente che non c'è nessun user
		if (!lsGetToken()) {
			// Quindi termina il caricamento e si resta nella stessa pagina
			loading = false;
		}
		// Se invece il token c'è, c'è un utente
		else {
			try {
				// Si chiede quindi a strapi se l'utente esiste effettivamente
				const res = await req.me();
				await goto('/inside');
			} catch (e) {
				loading = false;
			}
		}
	});
</script>

<!-- --- Markup --- -->

<NavbarOutside />
<div class="container">
	{#if loading}
		<Loading />
	{:else}
		<slot />
	{/if}
</div>
