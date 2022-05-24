<script lang="ts">
	export let icon: Function;
	export let mode: 'light' | 'dark' = 'light';
	export let backgroundColor = 'transparent';
</script>

<button
	on:click
	class:light={mode == 'light'}
	class:dark={mode == 'dark'}
	style:background-color={backgroundColor}
>
	<svelte:component
		this={icon}
		class={mode == 'light' ? 'iconPrimary-l' : 'iconPrimary-d'}
	/>
</button>

<style>
	button {
		width: 32px;
		height: 32px;
		padding: 4px;
		line-height: 0;
		border-radius: var(--border-radius);
		border: none;
		background-color: transparent;
	}

	button:hover {
		cursor: pointer;
	}

	.light:hover {
		background-color: var(--surface-hover-l);
	}

	.dark:hover {
		background-color: var(--surface-hover-d);
	}
</style>
