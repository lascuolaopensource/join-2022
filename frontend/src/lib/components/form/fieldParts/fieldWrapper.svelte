<script lang="ts">
	import FieldHelpers from './fieldHelpers.svelte';
	import FieldLabel from './fieldLabel.svelte';

	//

	// Field props
	export let fieldName: string;
	// Label props
	export let labelText = '';
	export let labelIcon: Function | null = null;
	export let labelLink: { text: string; href: string } | null = null;
	// Bottom props
	export let helperText = '';
</script>

<!--  -->

<div class="space-y-1">
	<FieldLabel {fieldName} text={labelText} icon={labelIcon} link={labelLink} />
	<slot />
	<FieldHelpers {fieldName} {helperText} />
</div>
