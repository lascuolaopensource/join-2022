<script lang="ts">
	//
	import { variables } from '$lib/variables';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { localStorageGet } from '$lib/helpers/localStorageOps';
	import { createAuthorizationHeader } from '$lib/helpers/requestUtils';

	import Loading from '$lib/components/loading.svelte';

	// Questa variabile tiene traccia dello stato di caricamento
	let loading = true;

	// ON MOUNT (Quando il componente viene chiamato)
	// Ovvero, quando ogni pagina viene caricata
	onMount(async () => {
		// Prendiamo il token in localstorage
		const token = localStorageGet(variables.localStorage.token);

		// Se il token 'è vuoto', significa automaticamente che non c'è nessun user
		if (!token) {
			// Quindi termina il caricamento e si resta nella stessa pagina
			loading = false;
		}
		// Se invece il token c'è, c'è un utente
		else {
			// Si chiede quindi a strapi se l'utente è registrato
			const res = await fetch(variables.backendUrl + '/auth/me', {
				headers: {
					Authorization: createAuthorizationHeader(token)
				}
			});

			// Se l'utente è loggato, si va direttamente all'interno
			if (res.ok) {
				goto('/inside');
			}
			// Altrimenti, il caricamento finisce
			else {
				loading = false;
				// NOTA: Serve riportare l'errore nel caso ci sia?
			}
		}
	});
</script>

<!--  -->

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
