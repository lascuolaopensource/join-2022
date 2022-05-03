<script lang="ts" context="module">
	export type StepData = { label: string; href: string };
</script>

<script lang="ts">
	// We get the page store in order to get the current url
	import { page } from '$app/stores';

	//

	export let data: StepData;

	//

	const href = data.href;
	const label = data.label;

	// This variable keeps track if the page is open or not
	let active = false;

	// This one executes every time $page changes
	// Checks if the href variable matches with the current url
	$: active = $page.url.pathname == href;
</script>

<!--  -->

<a class:inactive={!active} class:active {href}>
	{label}
</a>

<!--  -->
<style>
	a {
		display: inline-block;
		width: fit-content;
		text-decoration: none;
		padding: var(--item-padding);
		border-radius: var(--border-radius);
		font-size: var(--text-normal);
		line-height: var(--text-normal);
	}

	.inactive {
		color: black;
		background-color: lightgray;
	}

	.inactive:hover {
		background-color: gray;
	}

	.active {
		color: white;
		background-color: black;
	}
</style>
