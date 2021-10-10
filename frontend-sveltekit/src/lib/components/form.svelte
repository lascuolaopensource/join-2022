<script lang="ts">
	export let title = '';
</script>

<form on:submit|preventDefault>
	<!-- Title -->
	{#if title != ''}
		<h1>{title}</h1>
	{/if}
	<!-- Content -->
	<slot />
</form>

<style>
	form {
		display: flex;
		flex-flow: column nowrap;
		gap: var(--s-4);
		padding: var(--s-4);
	}
</style>
