<script lang="ts">
	export let href: string;
	export let blank = false;
	export let disabled = false;
	export let small = false;
</script>

<!--  -->

<a
	{href}
	{disabled}
	target={blank ? '_blank' : '_self'}
	class="
		{small ? 'py-1 px-2' : 'p-3'}
		{!disabled ? 'text-black bg-gray-300 hover:bg-gray-400' : ''}
		{disabled ? 'text-gray-400 bg-gray-300' : ''}
	"
>
	<slot />
</a>
