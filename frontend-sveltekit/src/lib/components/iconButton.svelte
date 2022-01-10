<script lang="ts">
	export let icon: Function;
	export let mode: 'light' | 'dark' = 'light';
</script>

<div class="buttonContainer">
	<button on:click class:light={mode == 'light'} class:dark={mode == 'dark'}>
		<svelte:component
			this={icon}
			class={mode == 'light' ? 'iconPrimary-l' : 'iconPrimary-d'}
		/>
	</button>
</div>

<style>
	div {
		width: 16px;
		height: 16px;
		background-color: transparent;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	button {
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
