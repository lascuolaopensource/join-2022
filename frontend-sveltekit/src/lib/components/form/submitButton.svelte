<script lang="ts">
	import { getContext } from 'svelte';
	import { formKey } from './form.svelte';

	// const { isValid } = getContext(formKey);
</script>

<!--  -->

<button type="submit" class="btn btn-primary">
	<slot />
</button>
