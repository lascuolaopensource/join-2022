<script lang="ts">
	import { Container, Steps } from '$lib/components';
	import type { StepData } from '$lib/components/step.svelte';

	const data: Array<StepData> = [
		{ href: '/inside/tools', label: 'Start' },
		{ href: '/inside/tools/needs', label: 'Cosa' },
		{ href: '/inside/tools/slots-', label: 'Quando' }
	];
</script>

<Container>
	<Steps {data} />
	<div class="spacer" />
	<slot />
</Container>

<style>
	.spacer {
		width: 100%;
		height: var(--s-3);
	}
</style>
