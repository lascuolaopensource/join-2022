<script lang="ts">
	// We get the page store in order to get the current url
	import { page } from '$app/stores';

	// Variable for href
	export let href: string;

	// This variable keeps track if the page is open or not
	let active = false;

	// This one executes every time $page changes
	// Checks if the href variable has some match with the current url
	$: active =
		($page.url.pathname.includes(href) && href != '/inside') ||
		$page.url.pathname == href;
</script>

<a class:inactive={!active} class:active {href}>
	<slot />
</a>

<style>
	a {
		text-decoration: none;
		padding: var(--item-padding);
		border-radius: var(--border-radius);
		font-size: var(--text-normal);
		line-height: var(--text-normal);
	}

	.inactive {
		color: var(--nav-main-item-text);
		background-color: var(--nav-main-item-bg);
	}

	.inactive:hover {
		background-color: var(--nav-main-item-hover);
	}

	.active {
		color: var(--nav-main-item-text-active);
		background-color: var(--nav-main-item-bg-active);
	}
</style>
