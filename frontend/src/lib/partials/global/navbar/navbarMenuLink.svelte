<script lang="ts">
	import { page } from '$app/stores';

	export let href: string;

	let active = false;
	$: active = $page.url.pathname.includes(href) || $page.url.pathname == href;
</script>

<a
	{href}
	class="
		py-2 px-3 block w-fit cursor-pointer
		{active ? 'text-gray-900 bg-white' : 'bg-gray-700 hover:bg-gray-600 text-white'}
	"
>
	<slot {active} />
</a>
