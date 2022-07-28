<script lang="ts">
	export let icon: Function;
	export let mode: 'light' | 'dark' = 'light';
	export let transparent = false;
</script>

<!--  -->

<button
	on:click
	class="
		flex flex-row flex-nowrap items-center justify-center
		w-8 h-8 p-1 leading-none rounded-none hover:cursor-pointer
		{!transparent && mode == 'light' ? 'bg-gray-300 hover:bg-gray-400' : ''}
		{!transparent && mode == 'dark' ? 'bg-gray-700 hover:bg-gray-600' : ''}
		{transparent && mode == 'light' ? 'bg-white/20 hover:bg-white/30' : ''}
		{transparent && mode == 'dark' ? 'bg-black/20 hover:bg-black/30' : ''}
	"
>
	<svelte:component
		this={icon}
		class="
			{!transparent && mode == 'light' ? 'fill-black' : ''}
			{!transparent && mode == 'dark' ? 'fill-white' : ''}
			{transparent && mode == 'light' ? 'fill-white' : ''}
			{transparent && mode == 'dark' ? 'fill-black' : ''}
		"
	/>
</button>
