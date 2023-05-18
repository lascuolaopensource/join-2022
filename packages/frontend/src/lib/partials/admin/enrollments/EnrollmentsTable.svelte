<script lang="ts">
	import { types as t } from 'join-shared';

	import EnrollmentsTableRow from './EnrollmentsTableRow.svelte';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';

	//

	export let enrollments: Array<t.EnrollmentEntity>;
	export let canEdit: boolean;

	//

	// Listing all the enrollment states in the desired order
	const states = [
		t.Enum_Enrollment_State.Approved,
		t.Enum_Enrollment_State.Pending,
		t.Enum_Enrollment_State.Rejected,
		t.Enum_Enrollment_State.AwaitingPayment
	];

	// Filters the enrollments based on their state
	function filterEnrollmentsByState(
		enrollments: Array<t.EnrollmentEntity>,
		state: t.Enum_Enrollment_State
	): Array<t.EnrollmentEntity> {
		return enrollments.filter((e) => {
			return e.attributes?.state == state;
		});
	}
</script>

<!--  -->

<Table>
	{#each states as s}
		{@const enrolls = filterEnrollmentsByState(enrollments, s)}
		{@const enrollsNum = enrolls.length}

		<!-- Row - Section header -->
		<TableHead>
			<TableHeadCell colspan={100}>
				{s}
			</TableHeadCell>
		</TableHead>

		<!-- Rows - Data -->
		{#if enrollsNum > 0}
			<!-- Enrollments -->
			{#each enrolls as e (e.id)}
				<!-- Getting index to reference the actual enrollment -->
				{@const index = enrollments.indexOf(e)}
				<EnrollmentsTableRow {canEdit} bind:enrollment={enrollments[index]} />
			{/each}
		{:else}
			<!-- Empty section -->
			<TableBodyRow>
				<TableBodyCell colspan={100}>
					<p class="text-gray-400">No enrollments in this section</p>
				</TableBodyCell>
			</TableBodyRow>
		{/if}
	{/each}
</Table>
