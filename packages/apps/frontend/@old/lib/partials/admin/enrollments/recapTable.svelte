<script lang="ts">
	import { types as t, helpers as h } from 'shared';

	import { Table, Th, Td, Tr } from '$lib/components';

	//

	export let course: t.Course;
	export let enrollments: Array<t.Enrollment>;

	/**
	 * Getting info about the course
	 */

	const canStart = h.course.canStart(course, enrollments);
	const maxEnrollsExceeded = h.course.areMaxEnrollsExceeded(
		course,
		enrollments
	);

	// 	const startDate = f.formatDateString(h.course.getStartDate(c));
	// 	const deadlineDate = f.formatDateString(c.enrollmentDeadline);

	// 	// Enrolls number and ratios

	const enrollsNum = enrollments.length;
	const enrollsApprovedNum = enrollments.filter(
		(e) => e.state == t.Enum_Enrollment_State.Approved
	).length;

	const enrollsComparison = maxEnrollsExceeded
		? course.enrollmentMax
		: course.enrollmentMin;
	// const enrollsRatio

	// 	const enrollsMessage = maxEnrollsExceeded
	// 		? s.admin.enrollments.selectionNeeded
	// 		: s.admin.enrollments.selectionNotNeeded;

	// //

	// // Counts the number of enrollments approved
	// let enrollsApprovedNum = 0;

	// //

	// //

	// function countApprovedEnrollments() {
	// 	return Object.values(enrollments).filter((e) => {
	// 		return e.state == t.Enum_Enrollment_State.Approved;
	// 	}).length;
	// }
</script>

<!--  -->

<!-- <Table>
    <Tr>
        <Th>Stato</Th>
        <Td>
            {canStart ? '' : '⚠️'}
            Il corso {canStart ? '' : 'non'} può partire
        </Td>
    </Tr>
    <Tr>
        <Th>Selezione</Th>
        <Td>{course.enrollsMessage}</Td>
    </Tr>
    <Tr>
        <Th>Iscrizioni totali</Th>
        <Td
            >{res.course.enrollsNum} / min {res.course.enrollmentMin} / max {res
                .course.enrollmentMax}</Td
        >
    </Tr>
    <Tr>
        <Th>Iscrizioni approvate</Th>
        <Td
            >{enrollsApprovedNum} / min {res.course.enrollmentMin} / max
            {res.course.enrollmentMax}</Td
        >
    </Tr>
</Table> -->
