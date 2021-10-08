<script lang="ts">
	import { page } from '$app/stores';

	export let href: string;

	let active = false;

	$: active = ($page.path.includes(href) && href != '/') || $page.path == href;
</script>

<a class:inactive={!active} class:active {href}>
	<slot />
</a>

<style>
	a {
		text-decoration: none;
		padding: var(--padding-item);
		border-radius: var(--border-radius);
	}

	.inactive {
		color: black;
		background-color: transparent;
	}

	.inactive:hover {
		background-color: var(--hover-tertiary);
	}

	.active {
		color: white;
		background-color: black;
	}
</style>
