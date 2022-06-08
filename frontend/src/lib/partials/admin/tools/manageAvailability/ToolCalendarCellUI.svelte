<script lang="ts">
	import type { ToolCalendarCell } from './ToolCalendarCell';
	import { types as t } from 'shared';

	export let cell: ToolCalendarCell;

	let editable = cell.type == t.Enum_Toolslot_Type.Booking ? false : true;

	//

	function edit() {
		if (editable) {
			cell.type = cell.type == null ? t.Enum_Toolslot_Type.Availability : null;
			cell.edited = cell.edited ? false : true;
		}
	}
</script>

<!--  -->

<div
	class:blocked={cell.type === null}
	class:booked={cell.type == t.Enum_Toolslot_Type.Booking}
	class:free={cell.type == t.Enum_Toolslot_Type.Availability}
	class:edited={cell.edited}
	on:click={edit}
/>

<!--  -->
<style>
	div {
		width: 100%;
		height: 100%;
	}

	.booked {
		background-color: red;
	}

	.free {
		background-color: white;
	}

	.blocked.edited {
		background-color: blue;
		box-shadow: inset 0px 0px 0px 5px white;
	}

	.blocked {
		background-color: gray;
	}

	.free.edited {
		background-color: white;
		box-shadow: inset 0px 0px 0px 5px blue;
	}

	.free:hover,
	.blocked:hover {
		cursor: pointer;
	}
</style>
