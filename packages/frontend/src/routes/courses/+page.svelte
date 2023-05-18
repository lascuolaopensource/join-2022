<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { Button } from 'flowbite-svelte';
	import { TitleAndText, Container } from '$lib/components';
	import { CourseCard } from '$lib/partials';
	import paths from '$lib/constants/paths';

	export let data: PageData;

	let archive: boolean;
	$: archive = Boolean($page.url.searchParams.get('archive'));
</script>

<Container padding direction="column">
	{@const courses = data.data}
	<div class="flex justify-between items-start">
		{#if archive}
			<TitleAndText
				title="Archived courses"
				text="These courses are no longer available for enrollment."
			/>
			<Button href={paths.courses.index} color="light">Upcoming</Button>
		{:else}
			<TitleAndText
				title="Upcoming courses"
				text="These courses are available for enrollment."
			/>
			<Button href={paths.courses.archive} color="light">Archive</Button>
		{/if}
	</div>

	<div class="pt-6 md:grid md:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#if courses && courses.length > 0}
			{#each courses as course (course.id)}
				<CourseCard {course} showDeadline={!archive} />
			{/each}
		{:else}
			<div>No courses found.</div>
		{/if}
	</div>
</Container>
