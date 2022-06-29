<!-- Here we check if the user is logged otherwise we send it away -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import { req } from '$lib/requestUtils';
	import { user, userInfo, userRole } from '$lib/stores';

	//

	import Navbar from '$lib/partials/navbar.svelte';
	import Loading from '$lib/components/loading.svelte';

	//

	// Si serve usare per "nascondere" lo slot fino a quando il caricamento non è completo
	let loading = true;

	// Quando il componente viene chiamato:
	onMount(async () => {
		try {
			// Fetch the user from strapi
			const userRes = await req.me();
			$user = userRes;
			// Fetch the user's info
			const userInfoRes = await req.getUserInfo(userRes.id);
			$userInfo = userInfoRes.attributes;
			// Fetch the user's role
			const userRoleRes = await req.getRole();
			$userRole = userRoleRes.role;
			// Loading ends in that case
			loading = false;
		} catch (e) {
			// Redirect if user is not found
			await goto('/');
		}
	});
</script>

{#if loading}
	<Loading />
{:else}
	<Navbar />
	<slot />
{/if}
