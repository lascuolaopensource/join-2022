<script lang="ts">
	import { types as t, formatters as f, helpers as h } from 'shared';

	export let course: t.ID<t.Course>;

	const enrollments = course.enrollments as any as Array<t.Enrollment>;

	const ratio = enrollments.length / course.enrollmentMin;
	let color;
	if (ratio < 1) {
		color = 'red';
	} else if (ratio >= 1) {
		color = 'green';
	}
</script>

<!--  -->

<a href="/inside/admin/enrollments/{course.id}">
	<h3>
		{course.title}
	</h3>
	<p>Deadline: {f.formatDateString(course.enrollmentDeadline)}</p>
	<p>Inizio: {f.formatDateString(h.course.getStartDate(course))}</p>
	<p>
		Iscritti: <span style:color
			>{enrollments.length} / {course.enrollmentMin}</span
		>
	</p>

	<h3 class="arrow">→</h3>
</a>

<!--  -->
<style>
	a {
		display: block;
		text-decoration: none;
		padding: 20px;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.1);
	}

	a:hover {
		background-color: rgba(0, 0, 0, 0.2);
	}

	.arrow {
		width: 100%;
		text-align: right;
	}
</style>
