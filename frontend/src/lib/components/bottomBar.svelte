<script lang="ts">
	export let background: 'alert' | 'default' = 'alert';
</script>

<div
	class="sticky bottom-0 w-full left-0 py-4 px-6"
	class:bg-yellow-100={background == 'alert'}
	class:bg-white={background == 'default'}
>
	<slot />
</div>
