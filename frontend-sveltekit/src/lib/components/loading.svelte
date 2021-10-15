<script lang="ts">
	export let fullscreen = false;

	import Spinner from '$lib/components/spinner.svelte';
</script>

<div class:fullscreen class:container={!fullscreen}>
	<Spinner />
</div>

<style>
	div {
		background-color: var(--outside-bg);
		color: white;

		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
	}

	.fullscreen {
		width: 100vw;
		height: 100vh;
	}

	.container {
		width: 100%;
		height: 100%;
	}
</style>
