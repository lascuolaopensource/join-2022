<script lang="ts">
	import './app.css';

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { lsGetToken } from '$lib/localStorageUtils';
	import { req } from '$lib/requestUtils';

	import { Loading, Container } from '$lib/components';
	import Navbar from '$lib/partials/global/navbar/navbar.svelte';

	//

	// Questa variabile tiene traccia dello stato di caricamento
	let loading = true;

	// ON MOUNT (Quando il componente viene chiamato)
	onMount(async () => {
		// Prendiamo il token in localstorage
		// Se il token non c'è, significa automaticamente che non c'è nessun user
		// Quindi termina il caricamento e si resta nella stessa pagina
		if (!lsGetToken()) {
			loading = false;
		}
		// Se invece il token c'è, c'è un utente
		else {
			try {
				// Si chiede quindi a strapi se l'utente esiste effettivamente
				await req.me();
				await goto('/inside');
			} catch (e) {
				loading = false;
			}
		}
	});
</script>

<!--  -->

<Navbar />
<Container>
	{#if loading}
		<Loading />
	{:else}
		<slot />
	{/if}
</Container>
