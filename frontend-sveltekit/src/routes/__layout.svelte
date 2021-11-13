<script lang="ts">
	//
	import { variables } from '$lib/variables';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	// Si usa per "nascondere" il contenuto
	// fino a quando il caricamento non è completo (loading = false)
	import loadingStore from '$lib/stores/loadingStore';

	import Loading from '$lib/components/loading.svelte';

	// ON MOUNT (Quando il componente viene chiamato):
	// If the user is logged already, we send him inside
	onMount(async () => {
		// Se non c'è il token in localstorage
		// significa automaticamente che non c'è nessun user
		if (!localStorage.getItem('token')) {
			// Quindi termina il caricamento
			loadingStore.set(false);
			// E si resta nella stessa pagina
		}
		// Se invece il token c'è,
		// C'è un utente
		else {
			// Si chiede quindi se l'utente è registrato
			const res = await fetch(variables.backendUrl + '/auth/me', {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
			});

			// Se si, si va direttamente all'interno
			if (res.ok) {
				goto('/inside');
			}
			// Altrimenti, il caricamento finisce
			// NOTA: Serve riportare l'errore nel caso ci sia?
			else {
				loadingStore.set(false);
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
			{#if $loadingStore}
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
