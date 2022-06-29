<script lang="ts">
	import './app.css';

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { lsRemove, lsKeys } from '$lib/localStorageUtils';
	import { user } from '$lib/stores';

	//

	// Questa variabile tiene traccia dello stato di caricamento
	let loading = true;

	// ON MOUNT (Quando il componente viene chiamato)
	onMount(async () => {
		// We remove the token from localstorage
		lsRemove(lsKeys.token);
		// And the user from the store
		$user = null;
		// Then we redirect
		goto('/');
	});
</script>
