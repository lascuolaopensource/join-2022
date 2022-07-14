<script lang="ts">
	import { page } from '$app/stores';
	import { isOpen } from '$lib/utils';

	export let href: string;
	export let theme: 'dark' | 'medium' | 'light' = 'dark';

	let active = false;
	$: active = isOpen(href, $page.url);
</script>

<!--  -->

<a
	{href}
	class="py-2 px-3 block w-fit cursor-pointer"
	class:dark={theme == 'dark'}
	class:medium={theme == 'medium'}
	class:active
>
	<slot {active} />
</a>

<!--  -->
<style lang="postcss">
	.dark {
		@apply bg-gray-700 hover:bg-gray-600 text-white;
	}

	.dark.active {
		@apply text-gray-900 bg-white;
	}

	.medium {
		@apply bg-gray-600 hover:bg-gray-500 text-white;
	}

	.medium.active {
		@apply text-gray-900 bg-white;
	}
</style>
