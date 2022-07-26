<script lang="ts">
	export let color: 'green' | 'red' | 'yellow' = 'yellow';
</script>

<!--  -->

<div
	class="
		border-l-4 p-3
		{color == 'yellow' ? 'border-l-yellow-400 bg-yellow-100' : ''}
		{color == 'green' ? 'border-l-green-400 bg-green-100' : ''}
		{color == 'red' ? 'border-l-red-400 bg-red-100' : ''}
	"
>
	<slot />
</div>
