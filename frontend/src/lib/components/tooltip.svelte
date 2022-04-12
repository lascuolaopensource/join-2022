<script lang="ts">
	import { fade } from 'svelte/transition';

	export let state: 'positive' | 'negative' | 'neutral' = 'positive';
	export let duration = 3000;
	export let visible = false;

	$: if (visible) {
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
		class:negative={state == 'negative'}
		class:neutral={state == 'neutral'}
		class:positive={state == 'positive'}
	>
		<slot />
	</div>
{/if}

<!--  -->
<style>
	div {
		position: fixed;
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
