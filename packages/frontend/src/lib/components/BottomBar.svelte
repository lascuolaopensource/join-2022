<script lang="ts">
	export let background: 'alert' | 'default' | 'blur' = 'alert';
	export let justify: 'start' | 'center' | 'end' | 'between' = 'end';
</script>

<div
	class="
		sticky bottom-0 w-full left-0 border-t-1
		{background == 'alert' ? 'border-yellow-400' : 'border-gray-300'}
		{background == 'blur' ? 'backdrop-blur-sm bg-white/30' : ''}
	"
	class:bg-yellow-100={background == 'alert'}
	class:bg-white={background == 'default'}
>
	<div
		class="container mx-auto py-2 px-6 flex flex-row items-center space-x-4"
		class:justify-start={justify == 'start'}
		class:justify-center={justify == 'center'}
		class:justify-end={justify == 'end'}
		class:justify-between={justify == 'between'}
	>
		<slot />
	</div>
</div>
