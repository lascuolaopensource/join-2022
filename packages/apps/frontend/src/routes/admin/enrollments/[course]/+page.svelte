<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import type { PageData } from './$types';
	import { Container, TitleAndLink } from '$lib/components';
	import { Heading, Button } from 'flowbite-svelte';
	import { helpers as h, formatters as f } from 'join-shared';
	import paths from '$lib/constants/paths';
	import EnrollmentsTable from '$lib/partials/admin/enrollments/EnrollmentsTable.svelte';

	export let data: PageData;

	const c = data.course!.attributes!;
	let enrollments = c.enrollments?.data!;
	$: console.log(enrollments);

	// TODO: isEvauluationTime
	const canEdit = true;
</script>

<!--  -->

<Container padding spaceBetween>
	<div class="flex items-start justify-between mb-4">
		<TitleAndLink
			title={`${c.name} – Manage enrollments`}
			link={{ href: `/admin/enrollments`, text: `← Back to all courses` }}
			reverse
		/>
		<Button disabled={!canEdit}>Confirm course</Button>
	</div>
	<EnrollmentsTable bind:enrollments {canEdit} />
</Container>
