<!-- Here we check if the user is logged otherwise we send it away -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import { req } from '$lib/requestUtils';
	import { user, userInfo } from '$lib/stores';

	//

	import NavbarMain from '$lib/components/navbarMain.svelte';
	import Loading from '$lib/components/loading.svelte';

	//

	// Si serve usare per "nascondere" lo slot fino a quando il caricamento non è completo
	let loading = true;

	// Quando il componente viene chiamato:
	onMount(async () => {
		try {
			// Fetch the user from strapi
			const UserRes = await req.me();
			$user = UserRes;
			// Fetch the user's info
			const UserInfoRes = await req.getUserInfo(UserRes.id);
			$userInfo = UserInfoRes.attributes;
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
	<NavbarMain />
	<slot />
{/if}
