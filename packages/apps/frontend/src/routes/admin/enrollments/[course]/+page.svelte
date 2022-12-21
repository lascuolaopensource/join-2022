<script lang="ts">
	import type { PageData } from './$types';
	import { Container, TitleAndLink } from '$lib/components';
	import { Button, Modal } from 'flowbite-svelte';
	import EnrollmentsTable from '$lib/partials/admin/enrollments/EnrollmentsTable.svelte';
	import Form from '$lib/form/Form.svelte';
	import { helpers as h } from 'join-shared';

	//

	export let data: PageData;

	//

	const c = data.course!.attributes!;
	let enrollments = c.enrollments?.data!;
	$: console.log(enrollments);

	const canEdit = h.Course.canEditEnrollments(c);

	function onEnhance(data: FormData) {
		data.set('enrollments', JSON.stringify(enrollments));
	}

	let showConfirmModal = false;
	const openConfirmModal = () => (showConfirmModal = true);
</script>

<!--  -->

<Container padding spaceBetween>
	<div class="flex items-start justify-between mb-4">
		<TitleAndLink
			title={`${c.name} – Manage enrollments`}
			link={{ href: `/admin/enrollments`, text: `← Back to all courses` }}
			reverse
		/>
		<Button type="submit" disabled={!canEdit} on:click={openConfirmModal}>
			Confirm course
		</Button>
	</div>
	<EnrollmentsTable bind:enrollments {canEdit} />
</Container>

<Modal title="Warning!" bind:open={showConfirmModal}>
	<p>
		Are you sure you want to <strong>confirm</strong> the course?<br />
		All the people that enrolled will be notified by email, and it won't be possible to accept enrollments
		anymore!
	</p>
	<Form {onEnhance} buttonDefault={false}>
		<Button type="submit">Confirm course</Button>
	</Form>
</Modal>
