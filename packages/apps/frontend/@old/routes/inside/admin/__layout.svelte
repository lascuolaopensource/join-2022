<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import { req } from '$lib/requestUtils';
	import { userRole } from '$lib/stores';
	import { types as t } from 'shared';

	import { Loading } from '$lib/components';

	//

	// Si serve usare per "nascondere" lo slot fino a quando il caricamento non è completo
	let loading = true;

	// Quando il componente viene chiamato:
	onMount(async () => {
		try {
			// Fetch the user's role
			const userRoleRes = await req.getRole();
			$userRole = userRoleRes.role;

			// Redirect based on role
			if (userRoleRes.role == t.UserPermissionRoles.AdminEnrollments) {
				await goto('/inside/admin/enrollments');
			} else if (userRoleRes.role == t.UserPermissionRoles.AdminTools) {
				await goto('/inside/admin/tools');
			} else {
				await goto('/');
			}

			// Loading ends in that case
			loading = false;
		} catch (e) {
			// Redirect if user is not found
			await goto('/');
		}
	});
</script>

<!--  -->

{#if loading}
	<Loading />
{:else}
	<slot />
{/if}
