<script lang="ts">
	export let hierarchy: 'Primary' | 'Secondary' | 'Tertiary' = 'Primary';
</script>

<button
	class:primary={hierarchy == 'Primary'}
	class:secondary={hierarchy == 'Secondary'}
	class:tertiary={hierarchy == 'Tertiary'}
	on:click
>
	<slot />
</button>

<style>
	button {
		padding: var(--padding-item);
		border-radius: var(--border-radius);
		border: none;
	}

	button:hover {
		cursor: pointer;
	}

	.primary {
		background-color: yellow;
	}

	.primary:hover {
		background-color: orange;
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
		background-color: var(--hover-tertiary);
	}
</style>
