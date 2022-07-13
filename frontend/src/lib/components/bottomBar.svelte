<script lang="ts">
	export let background: 'alert' | 'default' | 'blur' = 'alert';
</script>

<div
	class="
		sticky bottom-0 w-full left-0 py-2 px-4
		border-t-1
		{background == 'alert' ? 'border-yellow-400' : 'border-gray-500'}
		{background == 'blur' ? 'backdrop-blur-sm bg-white/30' : ''}
	"
	class:bg-yellow-100={background == 'alert'}
	class:bg-white={background == 'default'}
>
	<div class="container mx-auto px-4">
		<slot />
	</div>
</div>
