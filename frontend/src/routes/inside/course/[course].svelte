<script lang="ts" context="module">
	import { req } from '$lib/requestUtils';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params, fetch, session, stuff }: any) {
		const slug = params.course;
		const course = await req.getCourseBySlug(slug, fetch);

		return {
			props: {
				slug,
				course
			}
		};
	}
</script>

<script lang="ts">
	import { helpers as h, types as t } from 'shared';
	import SvelteMarkdown from 'svelte-markdown';
	import { goto } from '$app/navigation';

	import { BottomBar, Button } from '$lib/components';

	export let course: t.CourseEntity;
	export let slug: string;

	// Checking if user is enrolled
	const promise = req.isUserEnrolled(course.id as string);

	const c = course.attributes;

	function goToEnroll() {
		goto(`/shared/enroll/${slug}`);
	}
</script>

<!--  -->

{#if c}
	<!-- Cover -->
	<div
		class="
			max-h-[500px] h-[40vh] bg-gray-200
			flex flex-row flex-nowrap items-center justify-center
		"
	>
		<h1 class="text-2xl font-bold">{c.title}</h1>
	</div>

	<!-- Descrizione -->
	{#if c.description}
		<div class="mx-auto prose p-4">
			<SvelteMarkdown source={c.description} />
		</div>
	{/if}

	<!-- Iscriviti -->
	{#if h.course.isErollmentTime(c)}
		<BottomBar background="blur">
			<div class="flex justify-end">
				{#await promise then isUserEnrolled}
					{@const isEnrolled = isUserEnrolled.enrolled}
					<Button on:click={goToEnroll} disabled={isEnrolled}>
						{#if isEnrolled}
							Sei già iscritto!
						{:else}
							Iscriviti →
						{/if}
					</Button>
				{/await}
			</div>
		</BottomBar>
	{/if}
{/if}
