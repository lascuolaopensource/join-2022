<script lang="ts">
	import { goto } from '$app/navigation';
	import { toolNeeds } from '$lib/stores';

	import Container from '$lib/components/container.svelte';
	import ToolsSteps from '$lib/partials/tools/toolsSteps.svelte';

	// Redirecting if there's no data
	if ($toolNeeds.length == 0) {
		goto('/inside/tools/needs');
	}
</script>

<Container>
	<ToolsSteps />
</Container>
<slot />
