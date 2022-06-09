<script lang="ts">
	export let icon: Function;
</script>

<!--  -->

<button
	on:click
	class="w-8 h-8 p-1 leading-none rounded-none hover:cursor-pointer bg-gray-300 hover:bg-gray-400"
>
	<svelte:component this={icon} class={'iconPrimary-l'} />
</button>
