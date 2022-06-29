<script lang="ts">
	export let icon: Function;
	export let mode: 'light' | 'dark' = 'light';
</script>

<!--  -->

<button
	on:click
	class="
		w-8 h-8 p-1 leading-none rounded-none hover:cursor-pointer
		{mode == 'light' ? 'bg-gray-300 hover:bg-gray-400' : ''}
		{mode == 'dark' ? 'bg-gray-700 hover:bg-gray-600' : ''}
	"
>
	<svelte:component this={icon} class="fill-white" />
</button>
