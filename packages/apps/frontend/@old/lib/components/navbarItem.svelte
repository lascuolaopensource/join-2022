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

<!--  -->

<a
	{href}
	class="
		inline-block px-3 py-2
		{!active ? 'bg-slate-600 hover:bg-slate-500 text-white' : ''}
		{active ? 'bg-white text-slate-900' : ''}
	"
>
	<slot />
</a>
