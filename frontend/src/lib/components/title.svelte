<script lang="ts">
	export let margin = false;
	export let heading: 'h1' | 'h2' | 'h3' = 'h1';
</script>

<!--  -->

{#if heading == 'h1'}
	<h1 class="text-2xl font-bold" class:mb-6={margin}>
		<slot />
	</h1>
{:else if heading == 'h2'}
	<h2 class="text-xl font-bold" class:mb-6={margin}>
		<slot />
	</h2>
{:else if heading == 'h3'}
	<h3 class="text-lg font-bold" class:mb-6={margin}>
		<slot />
	</h3>
{/if}
