<script lang="ts">
	// We check if the user is logged already, so we send him inside
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	// Si serve usare per "nascondere" lo slot fino a quando il caricamento non è completo
	let loading = true;

	// Quando il componente viene chiamato:
	onMount(async () => {
		// Fetch the user from strapi
		const res = await fetch('http://localhost:1337/auth/me', {
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
		});

		//
		if (res.ok) {
			goto('/inside');
		}
		//
		else {
			loading = false;
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
		padding: 45px;
		background-color: white;
		border-radius: var(--border-radius);
	}

	@media (max-width: 767px) {
		section {
			padding: 15px;
		}
	}
</style>
