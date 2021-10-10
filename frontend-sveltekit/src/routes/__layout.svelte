<script lang="ts">
	// We check if the user is logged already, so we send him inside
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	// Si serve usare per "nascondere" il contenuto
	// fino a quando il caricamento non è completo
	// (In partenza ovviamente si è in caricamento)
	let loading = true;

	// Quando il componente viene chiamato:
	onMount(async () => {
		// Se non c'è il token in localstorage termina il caricamento
		if (!localStorage.getItem('token')) {
			loading = false;
		}
		// Se invece il token c'è:
		else {
			// Si chiede se l'utente è registrato
			const res = await fetch('http://localhost:1337/auth/me', {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
			});

			// Se si, si va direttamente all'interno
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

{#if loading}
	loading...
{:else}
	<div>
		<section>
			<slot />
		</section>
	</div>
{/if}

<style>
	div {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: center;
		background-color: blue;
	}

	section {
		min-width: 200px;
		max-width: 500px;
		width: 100%;
		background-color: white;
		border-radius: var(--border-radius);
	}
</style>
