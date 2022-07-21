<script lang="ts">
	import { types as t } from 'shared';

	import EnrollmentRow from './enrollmentRow.svelte';
	import { Table, Th, Td, Tr } from '$lib/components';
	import { enrollmentStatesAdmin } from '$lib/strings';

	//

	export let enrollments: Array<t.EnrollmentEntity>;
	export let isCourseConfirmed: boolean;

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
		<Tr>
			<Th colspan={100}>
				{enrollmentStatesAdmin[s]}
			</Th>
		</Tr>

		<!-- Rows - Data -->
		{#if enrollsNum > 0}
			<!-- Enrollments -->
			{#each enrolls as e (e.id)}
				<!-- Getting index to reference the actual enrollment -->
				{@const index = enrollments.indexOf(e)}
				<EnrollmentRow
					{isCourseConfirmed}
					bind:enrollment={enrollments[index]}
				/>
			{/each}
		{:else}
			<!-- Empty section -->
			<Tr>
				<Td colspan={100}>
					<p class="text-gray-400">Non ci sono iscrizioni in questa sezione</p>
				</Td>
			</Tr>
		{/if}
	{/each}
</Table>
