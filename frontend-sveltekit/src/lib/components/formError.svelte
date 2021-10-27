<script lang="ts">
	export let show = false;
</script>

{#if show}
	<div>
		<slot />
	</div>
{/if}

<style>
	div {
		width: 100%;
		padding: var(--s-2);
		background-color: var(--form-err-bg);
		color: var(--form-err-color);
		border: var(--form-err-border);
	}
</style>
