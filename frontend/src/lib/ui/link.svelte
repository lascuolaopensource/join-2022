<script lang="ts">
	export let href: string;
	export let size: 'sm' | 'base' = 'base';
	export let backlink = false;
	export let margin = false;
</script>

<!--  -->

<a
	class:text-sm={size == 'sm'}
	class:text-base={size == 'base'}
	class:backlink
	class="
		text-blue-700 hover:text-white hover:bg-blue-700
		{margin ? 'block mb-4 w-fit' : ''}
	"
	{href}
>
	<slot />
</a>

<style>
	.backlink::before {
		content: '\2190  ';
	}
</style>
