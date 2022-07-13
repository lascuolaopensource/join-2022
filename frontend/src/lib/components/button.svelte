<script lang="ts">
	export let hierarchy: 'primary' | 'secondary' = 'primary';
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let tabindex = 0;
	export let fullWidth = false;
	export let disabled = false;
	export let small = false;
</script>

<button
	class="
		{small ? 'py-1 px-2' : 'p-3'}
		{!disabled ? 'text-black' : ''}
		{disabled ? 'text-gray-400 bg-gray-300' : ''}
		{hierarchy == 'primary' && !disabled ? 'bg-yellow-400 hover:bg-yellow-500' : ''}
		{hierarchy == 'secondary' && !disabled ? 'bg-gray-300 hover:bg-gray-400' : ''}
		{fullWidth ? 'w-full' : ''}
	"
	{type}
	{tabindex}
	{disabled}
	on:click
>
	<slot />
</button>
