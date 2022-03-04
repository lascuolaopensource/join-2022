<!-- src/lib/Navbar.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores';
	import { lsRemove, lsKeys } from '$lib/localStorageUtils';

	async function logout() {
		// We remove the token from localstorage
		lsRemove(lsKeys.token);
		// And the user from the store
		$user = null;
		// Then we redirect
		await goto('/');
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
