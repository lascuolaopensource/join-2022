<script lang="ts">
	import { formatters as f } from 'shared';
	import type { types as t } from 'shared';

	//

	export let enrollment: t.Enrollment;

	//

	const course = enrollment.course as any as t.Course;
	const enrollmentDate = f.formatDateString(enrollment.createdAt);
</script>

<!--  -->

<div class="border-1 border-gray-400 p-4">
	<p><strong>{course.title}</strong></p>
	<p>Iscritto il: {enrollmentDate}</p>
</div>
