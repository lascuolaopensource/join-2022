<script lang="ts">
	import { getContext } from 'svelte';
	import { key } from './key';
	import type { FormState } from './types';
	import { flattenObject } from 'flatten-anything';

	//

	export let name: string;

	//

	const { form, errors, handleChange } = getContext(key) as FormState;

	let error: string | undefined;
	$: error = flattenObject($errors)[name];

	let value: string | undefined;
	$: value = flattenObject($form)[name];

	let color: 'base' | 'green' | 'red' = 'base';
	$: error ? (color = 'red') : (color = 'base');
</script>

<!--  -->

<slot {color} {value} {error} {handleChange} />
