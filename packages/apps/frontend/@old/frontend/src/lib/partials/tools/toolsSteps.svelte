<script lang="ts">
	import { Steps } from '$lib/components';
	import type { StepData } from '$lib/components/step.svelte';

	const data: Array<StepData> = [
		{ href: '/inside/tools/needs', label: 'Cosa' },
		{ href: '/inside/tools/availabilities', label: 'Quando' },
		{ href: '/inside/tools/recap', label: 'Recap' }
	];
</script>

<!--  -->

<div class="mb-6">
	<Steps {data} />
</div>
