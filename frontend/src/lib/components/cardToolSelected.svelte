<script lang="ts">
	import IconButton from './iconButton.svelte';

	export let text: string;
	export let icon: Function = null;
</script>

<!--  -->

<div>
	<p>{text}</p>
	{#if icon}
		<IconButton {icon} on:click backgroundColor="lightgray" />
	{/if}
</div>

<!--  -->
<style>
	div {
		border: 1px solid gray;
		padding: var(--s-1);
		padding-left: var(--s-2);
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		align-items: center;
	}

	p {
		flex-grow: 1;
	}
</style>
