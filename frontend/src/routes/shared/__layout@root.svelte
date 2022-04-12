<script lang="ts">
	import { onMount } from 'svelte';

	import { req } from '$lib/requestUtils';
	import { lsGetToken } from '$lib/localStorageUtils';
	import { user, userInfo } from '$lib/stores';

	import { Loading, NavbarOutside, NavbarMain } from '$lib/components';

	//

	// Si serve usare per "nascondere" lo slot fino a quando il caricamento non è completo
	let loading = true;

	// Quando il componente viene chiamato la prima volta:
	onMount(async () => {
		try {
			// Check if JWT token exists in localStorage
			// Then, check if user exists and save in store
			if (lsGetToken()) {
				// Fetch the user from strapi
				const UserRes = await req.me();
				$user = UserRes;
				// Fetch the user's info
				const UserInfoRes = await req.getUserInfo(UserRes.id);
				$userInfo = UserInfoRes.attributes;
			}
		} finally {
			// In any case, loading ends
			loading = false;
		}
	});
</script>

<!--  -->

{#if loading}
	<Loading />
{:else}
	{#if $user}
		<NavbarMain />
	{:else}
		<NavbarOutside />
	{/if}
	<div class="container">
		<slot />
	</div>
{/if}
