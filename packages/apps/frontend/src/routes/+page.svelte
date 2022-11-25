<script lang="ts">
	import type { LayoutData } from './$types';
	import { Heading, Card, P } from 'flowbite-svelte';
	import { Container, TitleAndText } from '$lib/components';

	export let data: LayoutData;

	let sections: Array<{ title: string; href: string; desc?: string; disabled?: boolean }> = [
		{ title: 'Courses', href: '/courses', desc: 'Take a look at the new courses!' },
		{
			title: 'Tools & spaces',
			href: '/',
			desc: 'Book tools and rooms for a time slot for your projects',
			disabled: true
		}
	];
</script>

<Container direction="column" padding>
	<TitleAndText title={`Ciao ${data.user?.info.name}!`} text="What do you want to do today?" />

	<!-- List of sections -->
	<div class="pt-6 flex flex-row flex-wrap space-x-4">
		{#each sections as s}
			<div class:opacity-40={s.disabled} class="basis-80">
				<Card href={!s.disabled ? s.href : ''}>
					<div class="space-y-2">
						<Heading tag="h4">{s.title}</Heading>
						<P>{s.desc}</P>
					</div>
				</Card>
			</div>
		{/each}
	</div>
</Container>
