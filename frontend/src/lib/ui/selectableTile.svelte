<script lang="ts">
	export let selected: boolean = false;

	function update() {
		selected = !selected;
	}
</script>

<!--  -->

<div
	on:click={update}
	class="p-2"
	class:bg-slate-200={!selected}
	class:bg-blue-400={selected}
>
	<slot />
</div>
