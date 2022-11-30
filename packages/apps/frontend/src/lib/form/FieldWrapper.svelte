<script lang="ts">
	import { getContext } from 'svelte';
	import { key } from './key';
	import type { FormState } from './types';
	import { flatten } from 'flatten-anything';

	//

	export let name: string;

	//

	const { form, errors, handleChange } = getContext(key) as FormState;

	let error: string | undefined;
	$: error = (flatten($errors) as Record<string, any>)[name];

	let value: string | undefined;
	$: value = (flatten($form) as Record<string, any>)[name];

	let color: 'base' | 'green' | 'red' = 'base';
	$: error ? (color = 'red') : (color = 'base');
</script>

<!--  -->

<slot {color} {value} {error} {handleChange} />
