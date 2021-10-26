<script lang="ts">
	export let hierarchy: 'Primary' | 'Secondary' | 'Tertiary' = 'Primary';
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let tabindex = 0;
</script>

<button
	{type}
	class:primary={hierarchy == 'Primary'}
	class:secondary={hierarchy == 'Secondary'}
	class:tertiary={hierarchy == 'Tertiary'}
	{tabindex}
	on:click
>
	<slot />
</button>

<style>
	button {
		padding: var(--item-padding);
		border-radius: var(--border-radius);
		border: none;
	}

	button:hover {
		cursor: pointer;
	}

	button:focus,
	button:active {
		outline: none;
		border: var(--input-border-focus);
		border-width: var(--input-border-width-focus);
		padding: calc(var(--item-padding) - var(--input-border-width-focus));
	}

	.primary {
		background-color: var(--btn-bg-primary);
		color: var(--btn-text-primary);
	}

	.primary:hover {
		background-color: var(--btn-bg-primary-hover);
	}

	.secondary {
		background-color: gray;
	}

	.secondary:hover {
		background-color: black;
	}

	.tertiary {
		background-color: transparent;
	}

	.tertiary:hover {
		background-color: var(--tertiary-hover-light);
	}
</style>
