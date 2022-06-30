<script lang="ts">
	import { page } from '$app/stores';
	import { isOpen } from '$lib/utils';

	export let href: string;

	let active = false;
	$: active = isOpen(href, $page.url);
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
