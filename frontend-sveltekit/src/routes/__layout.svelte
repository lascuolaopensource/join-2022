<script lang="ts">
	//
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import Loading from '$lib/components/loading.svelte';

	//

	// Si serve usare per "nascondere" il contenuto
	// fino a quando il caricamento non è completo (loading = false)
	let loading = true;

	// ON MOUNT (Quando il componente viene chiamato):
	// If the user is logged already, we send him inside
	onMount(async () => {
		// Se non c'è il token in localstorage
		// significa automaticamente che non c'è nessun user
		if (!localStorage.getItem('token')) {
			// Quindi termina il caricamento
			loading = false;
			// E si resta nella stessa pagina
		}
		// Se invece il token c'è,
		// C'è un utente
		else {
			// Si chiede quindi se l'utente è registrato
			const res = await fetch('http://localhost:1337/auth/me', {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
			});

			// Se si, si va direttamente all'interno
			if (res.ok) {
				goto('/inside');
			}
			// Altrimenti, il caricamento finisce
			// NOTA: Serve riportare l'errore nel caso ci sia?
			else {
				loading = false;
			}
		}
	});
</script>

<!--  -->

{#if loading}
	<Loading fullscreen />
{:else}
	<div class="container">
		<main>
			<div class="header">
				<h1>Join!</h1>
			</div>
			<section>
				<slot />
			</section>
		</main>
	</div>
{/if}

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
