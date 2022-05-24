<script lang="ts" context="module">
	import { types as t } from 'shared';

	export interface CellContent extends t.ToolSlotInput {
		edited: boolean;
		start: Date;
		end: Date;
	}
</script>

<script lang="ts">
	export let content: CellContent;

	let editable = content.type == t.Enum_Toolslot_Type.Booking ? false : true;

	//

	function edit() {
		if (editable) {
			content.type =
				content.type == null ? t.Enum_Toolslot_Type.Availability : null;
			content.edited = content.edited ? false : true;
		}
	}
</script>

<!--  -->

<div
	class:blocked={content.type === null}
	class:booked={content.type == t.Enum_Toolslot_Type.Booking}
	class:free={content.type == t.Enum_Toolslot_Type.Availability}
	class:edited={content.edited}
	on:click={edit}
>
	<slot />
</div>

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
