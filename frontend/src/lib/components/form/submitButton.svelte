<script lang="ts">
	import { getContext } from 'svelte';
	import { formKey } from './form.svelte';

	// const { isValid } = getContext(formKey);
</script>

<!--  -->

<div class="submit__container">
	<button type="submit" class="btn btn-primary">
		<slot />
	</button>
</div>
