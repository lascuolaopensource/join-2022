<!-- src/lib/Navbar.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
	// We need this to remove the user from the store
	import { user } from '$lib/stores';

	async function logout() {
		localStorage.removeItem('token');
		$user = null;
		goto('/');
	}
</script>

<button on:click={logout}>
	<slot />
</button>

<style>
	button {
		border: none;
		border-radius: var(--border-radius);
		padding: var(--item-padding);
		background-color: var(--nav-main-item-bg);
		color: var(--nav-main-item-text);
	}

	button:hover {
		cursor: pointer;
		background-color: var(--nav-main-item-hover);
	}
</style>
