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
	$: active = $page.url.pathname == href || $page.url.pathname.includes(href);
</script>

<!--  -->

<a
	{href}
	class="
		inline-block w-fit px-3 py-2
		{!active ? 'text-gray-900 bg-gray-300 hover:bg-gray-400' : ''}
		{active ? 'text-white bg-gray-900' : ''}
	"
>
	{label}
</a>
