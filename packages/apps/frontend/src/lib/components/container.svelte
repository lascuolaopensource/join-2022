<script lang="ts">
	export let center = false;
	export let direction: 'column' | 'row' = 'row';
	export let padding = false;
</script>

<div
	class="container mx-auto flex flex-row"
	class:items-center={center}
	class:justify-center={center}
	class:flex-row={direction === 'row'}
	class:flex-col={direction === 'column'}
	class:p-6={padding}
>
	<slot />
</div>
