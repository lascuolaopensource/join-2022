<script lang="ts">
	import type { PageData } from './$types';
	import { TitleAndText, Container } from '$lib/components';
	import { CourseCard } from '$lib/partials';

	export let data: PageData;

	const courses = data.data;
</script>

<Container padding direction="column">
	<TitleAndText title="Courses" text="All the courses." />
	<div class="pt-6 md:grid md:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#if courses && courses.length > 0}
			{#each courses as course}
				<CourseCard {course} />
			{/each}
		{:else}
			<div>No courses found.</div>
		{/if}
	</div>
</Container>
