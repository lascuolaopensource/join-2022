<script lang="ts">
	// We get the page store in order to get the current url
	import { page } from '$app/stores';

	import { getContext } from 'svelte';
	import { key } from './navbarMain.svelte';

	// Variable for href
	export let data: { label: string; href: string };

	// Context
	const context: any = getContext(key);

	function onClick(e) {
		context.updateSection(data);
	}

	// This variable keeps track if the page is open or not
	let active = false;

	// Shorthand
	let href = data.href;

	// This one executes every time $page changes
	// Checks if the href variable has some match with the current url
	$: active =
		($page.url.pathname.includes(href) && href != '/inside') ||
		$page.url.pathname == href;
</script>

<a class:inactive={!active} class:active {href} on:click={onClick}>
	{data.label}
</a>

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
