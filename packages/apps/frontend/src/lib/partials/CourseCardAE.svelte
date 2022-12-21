<!-- Course Card for Admin Enrollments (AE) -->
<script lang="ts">
	import type { types as t } from 'join-shared';
	import { helpers as h } from 'join-shared';
	import { formatters as f } from 'join-shared';
	import { Card, Heading, P } from 'flowbite-svelte';

	export let course: t.CourseEntity;

	const c = course.attributes!;

	const start = f.formatDate(h.Course.getStart(c));
	const enrollmentsNumber = c.enrollments?.data.length;
	const enrollmentsMin = c.enrollmentMin;
</script>

<Card href={`/admin/enrollments/${c?.slug}`}>
	<div class="space-y-1">
		<Heading tag="h5">{c?.name}</Heading>
		<P>
			<span class="font-semibold mr-1">Start:</span>
			<span>
				{start}
			</span>
		</P>
		<P>
			<span class="font-semibold mr-1">Enrollments:</span>
			<span>
				{enrollmentsNumber}/{enrollmentsMin}
			</span>
		</P>
	</div>
</Card>
