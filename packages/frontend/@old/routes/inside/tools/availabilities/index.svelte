<script lang="ts">
	import { goto } from '$app/navigation';
	import { toolNeeds } from '$lib/stores';

	// If length 1, there's just one day in the request
	if ($toolNeeds.length == 1) {
		goto('/inside/tools/availabilities/single');
	}
	// Otherwise,
	else {
		goto('/inside/tools/availabilities/multiple');
	}
</script>
