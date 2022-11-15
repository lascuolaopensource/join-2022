<script lang="ts">
	import { types as t, formatters as f, helpers as h } from 'shared';

	export let course: t.ID<t.Course>;

	const enrollments = course.enrollments as any as Array<t.Enrollment>;

	const ratio = enrollments.length / course.enrollmentMin;

	let color: string;
	if (ratio < 1) {
		color = 'red';
	} else if (ratio >= 1) {
		color = 'green';
	}
</script>

<!--  -->

<a
	class="block bg-gray-200 hover:bg-gray-300 p-4"
	href="/inside/admin/enrollments/{course.id}"
>
	<h3 class="text-lg font-bold mb-2">
		{course.title}
	</h3>
	<p>Deadline: {f.formatDateString(course.enrollmentDeadline)}</p>
	<p>Inizio: {f.formatDateString(h.course.getStartDate(course))}</p>
	<p>
		Iscritti: <span style:color
			>{enrollments.length} / {course.enrollmentMin}</span
		>
	</p>
</a>
