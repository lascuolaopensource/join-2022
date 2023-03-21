<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { Button } from 'flowbite-svelte';
	import { TitleAndText, Container } from '$lib/components';
	import { CourseCardAE } from '$lib/partials';
	import paths from '$lib/constants/paths';

	export let data: PageData;

	console.log(data);

	let archive: boolean;
	$: archive = Boolean($page.url.searchParams.get('archive'));
</script>

<Container padding direction="column">
	{@const courses = data.courses?.data}
	<div class="flex justify-between items-start">
		{#if archive}
			<TitleAndText
				title="Archived courses"
				text="These courses are no longer available for enrollment."
			/>
			<Button href={paths.admin.enrollments.index} color="light">Upcoming</Button>
		{:else}
			<TitleAndText
				title="Upcoming courses"
				text="These courses are available for enrollment."
			/>
			<Button href={paths.admin.enrollments.archive} color="light">Archive</Button>
		{/if}
	</div>

	<div class="pt-6 md:grid md:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#if courses && courses.length > 0}
			{#each courses as course (course.id)}
				<CourseCardAE {course} />
			{/each}
		{:else}
			<div>No courses found.</div>
		{/if}
	</div>
</Container>
