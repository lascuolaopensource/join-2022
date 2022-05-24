<script lang="ts" context="module">
	export type TooltipState = 'positive' | 'negative' | 'neutral';
	export type TooltipContent = {
		state: TooltipState;
		message: string;
	} | null;
</script>

<script lang="ts">
	import { fade } from 'svelte/transition';

	export let content: TooltipContent = null;
	export let duration = 3000;

	let visible = false;

	$: if (content) {
		visible = true;
		setTimeout(() => {
			visible = false;
		}, duration);
	}
</script>

<!--  -->

{#if visible}
	<div
		out:fade
		class="shadow"
		class:negative={content.state == 'negative'}
		class:neutral={content.state == 'neutral'}
		class:positive={content.state == 'positive'}
	>
		{content.message}
	</div>
{/if}

<!--  -->
<style>
	div {
		position: fixed;
		color: black;
		bottom: var(--s-3);
		left: var(--s-3);
		width: calc(100% - var(--s-3) * 2);
		padding: var(--s-2);
		box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.25);
	}

	.positive {
		background-color: lightgreen;
	}

	.negative {
		background-color: lightcoral;
	}

	.neutral {
		background-color: lightgray;
	}
</style>
