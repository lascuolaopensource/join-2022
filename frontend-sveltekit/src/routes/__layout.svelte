<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import { lsGetToken } from '$lib/localStorageUtils';
	import { endpoints, headersAuth } from '$lib/requestUtils';

	import { Loading, NavbarOutside } from '$lib/components';

	//

	// Questa variabile tiene traccia dello stato di caricamento
	let loading = true;

	// ON MOUNT (Quando il componente viene chiamato)
	onMount(async () => {
		// Prendiamo il token in localstorage
		const token = lsGetToken();

		// Se il token non c'è, significa automaticamente che non c'è nessun user
		if (!token) {
			// Quindi termina il caricamento e si resta nella stessa pagina
			loading = false;
		}
		// Se invece il token c'è, c'è un utente
		else {
			// Si chiede quindi a strapi se l'utente esiste effettivamente
			const res = await fetch(endpoints.me, {
				headers: headersAuth()
			});

			// Se esiste, si va all'interno
			if (res.ok) {
				goto('/inside');
			}
			// Altrimenti, il caricamento finisce
			else {
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
