<script lang="ts">
	import { goto } from '$app/navigation';
	import { toolNeeds } from '$lib/stores';

	// Redirecting if there's no data
	if ($toolNeeds.length == 0) {
		goto('/inside/tools/needs');
	}
</script>

<slot />
