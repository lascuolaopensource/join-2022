<script lang="ts">
	import Button from '$lib/components/button.svelte';

	// TODO: Bottone valido che prende le informazioni dal field
	// import { getContext } from 'svelte';
	// import { formKey } from './form.svelte';
	// const { isValid } = getContext(formKey);
</script>

<!--  -->

<div class="w-full flex flex-row flex-nowrap justify-end items-center">
	<Button type="submit">
		<slot />
	</Button>
</div>
