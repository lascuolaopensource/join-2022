<script lang="ts">
	export let spaceBetween = false;
</script>

<div
	class="bg-yellow-100 fixed bottom-0 w-full left-0 py-4 px-6 flex flex-row items-center"
	class:justify-between={spaceBetween}
>
	<slot />
</div>
