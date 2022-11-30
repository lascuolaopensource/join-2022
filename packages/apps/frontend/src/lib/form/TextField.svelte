<script lang="ts">
	import { getContext } from 'svelte';

	import { Input } from 'flowbite-svelte';
	import type { InputType } from 'flowbite-svelte/types';
	import FieldInfo from '$lib/components/FieldInfo.svelte';

	//

	export let name: string;
	export let type: InputType = 'text';

	export let label = '';
	export let help = '';
	export let placeholder = '';
	export let required = false;

	export let id = name;
</script>

<!--  -->

<FieldInfo fieldName={name} {label} {help}>
	<Input {name} {id} {placeholder} {required} {type} />
</FieldInfo>
