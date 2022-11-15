<script lang="ts">
	export let group: Array<any>;
	export let value: any;
	export let checked = false;

	$: updateCheckbox(group);
	$: updateGroup(checked);

	function updateCheckbox(group: Array<any>) {
		checked = group.indexOf(value) >= 0;
	}

	function updateGroup(checked: boolean) {
		const index = group.indexOf(value);
		if (checked) {
			if (index < 0) {
				group.push(value);
				group = group;
			}
		} else {
			if (index >= 0) {
				group.splice(index, 1);
				group = group;
			}
		}
	}

	function updateGroupClick() {
		updateGroup(!checked);
	}
</script>

<!--  -->

<div
	on:click={updateGroupClick}
	class="
		p-3
		{!checked ? 'bg-gray-300 hover:bg-gray-400' : ''}
		{checked ? 'bg-blue-400' : ''}
	"
>
	<slot />
</div>
