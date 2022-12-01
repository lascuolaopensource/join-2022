<script lang="ts">
	export let center = false;
	export let direction: 'column' | 'row' = 'column';
	export let padding = false;
	export let spaceBetween = false;
	export let narrow = false;
</script>

<div
	class="container mx-auto flex flex-row"
	class:items-center={center}
	class:justify-center={center}
	class:flex-row={direction === 'row'}
	class:flex-col={direction === 'column'}
	class:p-6={padding}
	class:space-y-6={spaceBetween}
	class:max-w-lg={narrow}
>
	<slot />
</div>
