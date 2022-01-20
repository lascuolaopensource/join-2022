<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import { lsGetToken } from '$lib/localStorageUtils';
	import { endpoints, headersAuth } from '$lib/requestUtils';

	import Loading from '$lib/components/loading.svelte';

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

<div class="container">
	<main>
		<div class="header">
			<h1>Join / SOS</h1>
		</div>
		<section>
			{#if loading}
				<Loading />
			{:else}
				<slot />
			{/if}
		</section>
	</main>
</div>

<!-- --- Style --- -->
<style>
	.container {
		background-color: var(--outside-bg);
		height: 100%;
		overflow-y: auto;

		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
	}

	main {
		min-width: 200px;
		max-width: 500px;
		width: 100%;
		border-radius: var(--border-radius);
		margin: auto;
	}

	section {
		background-color: var(--main-bg);
		padding: var(--s-4);
	}

	.header {
		width: 100%;
		background-color: var(--nav-main-bg);
		padding: var(--s-2) var(--s-4);
	}

	h1 {
		font-weight: 400;
		margin-bottom: 0;
		color: var(--nav-main-item-text);
	}
</style>
