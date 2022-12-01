<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { routes as r } from 'join-shared';

	import { Container } from '$lib/components';
	import { Hr, Heading } from 'flowbite-svelte';
	import { Form, Input, Textarea } from '$lib/form';

	export let data: PageData;
	export let form: ActionData;

	const c = data.course!.attributes!;

	const { values: initialValues, schema: validationSchema, getSchemaCtx } = r.Enroll;

	const validationContext = getSchemaCtx(
		Boolean(data.user),
		c.motivationalLetterNeeded,
		c.portfolioNeeded,
		c.cvNeeded
	);
</script>

<Container direction="column" padding>
	<div class="mx-auto max-w-lg w-full">
		<Heading tag="h5">
			{c.name}
		</Heading>
		<Heading tag="h4">Enroll!</Heading>

		<Form {initialValues} {validationSchema} {validationContext} error={form?.error}>
			<Hr hrClass="bg-gray-300 rounded border-0 dark:bg-gray-700" />

			{#if !data.user}
				<Input name="contacts.name" label="Name" placeholder="Maria" type="text" required />
				<Input
					name="contacts.surname"
					label="Surname"
					placeholder="Rossi"
					type="text"
					required
				/>
				<Input
					name="contacts.email"
					label="Email"
					placeholder="maria@rossi.com"
					type="email"
					required
				/>
			{/if}

			<Input
				name="contacts.phone"
				label="Phone"
				placeholder="+39 123 456 7890"
				type="tel"
				required
			/>

			<Hr hrClass="bg-gray-300 rounded border-0 dark:bg-gray-700" />

			{#if c.cvNeeded}
				<Input
					name="evaluation.cv"
					label="CV (Curriculum Vitae)"
					placeholder="linktoyourcv.com"
					help="Link to your cv (website, drive)"
					type="text"
					required
				/>
			{/if}

			{#if c.portfolioNeeded}
				<Input
					name="evaluation.portfolio"
					label="Portfolio"
					placeholder="linktoyourportfolio.com"
					help="Link to your portfolio (website, drive)"
					type="text"
					required
				/>
			{/if}

			{#if c.motivationalLetterNeeded}
				<Textarea
					name="evaluation.letter"
					label="Motivational Letter"
					placeholder="I would like to enroll in this course because..."
					help="Write a short text explaining why you want to enroll in this course"
					required
				/>
			{/if}

			<Hr hrClass="bg-gray-300 rounded border-0 dark:bg-gray-700" />
		</Form>
	</div>
</Container>
