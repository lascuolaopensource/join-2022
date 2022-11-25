<script lang="ts">
	import type { types as t } from 'join-shared';
	import { formatters as f } from 'join-shared';
	import { Card, Heading, P } from 'flowbite-svelte';

	export let course: t.CourseEntity;
	const c = course.attributes;
</script>

<Card href={`courses/${c?.slug}`}>
	<div class="space-y-1">
		<Heading tag="h5">{c?.name}</Heading>
		<P>
			<span class="font-semibold mr-1">Enrollment deadline:</span>
			<span>
				{f.formatDate(c?.enrollmentDeadline)}
			</span>
		</P>
	</div>
</Card>
