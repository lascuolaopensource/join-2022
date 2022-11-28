<script lang="ts">
	import type { PageData } from './$types';

	import { Container } from '$lib/components';
	import { Input, Label, Hr, Textarea, Button, Heading } from 'flowbite-svelte';

	export let data: PageData;

	const c = data.attributes!;
</script>

<Container direction="column" padding>
	<div class="mx-auto max-w-lg w-full">
		<Heading tag="h5">
			{c.name}
		</Heading>
		<Heading tag="h4">Enroll!</Heading>

		<form method="post" class="space-y-6 pt-6">
			<Hr hrClass="bg-gray-300 rounded border-0 dark:bg-gray-700" />

			{#if !data.user}
				<div>
					<Label for="contacts.name">Name</Label>
					<Input
						name="contacts.name"
						type="text"
						id="contacts.name"
						placeholder="Maria"
						required
						data-test="name"
					/>
				</div>

				<div>
					<Label for="contacts.surname">Surname</Label>
					<Input
						name="contacts.surname"
						type="text"
						id="contacts.surname"
						placeholder="Rossi"
						required
						data-test="surname"
					/>
				</div>

				<div>
					<Label for="contacts.email">Email</Label>
					<Input
						name="contacts.email"
						type="email"
						id="contacts.email"
						placeholder="maria@rossi.com"
						required
						data-test="email"
					/>
				</div>
			{/if}

			<div>
				<Label for="contacts.phone">Phone number</Label>
				<Input
					name="contacts.phone"
					type="tel"
					id="contacts.phone"
					placeholder="+39 123 456 7890"
					required
					data-test="phone"
				/>
			</div>

			<Hr hrClass="bg-gray-300 rounded border-0 dark:bg-gray-700" />

			{#if c.cvNeeded}
				<div>
					<Label for="evaluation.cv">CV (Curriculum Vitae)</Label>
					<Input
						name="evaluation.cv"
						type="url"
						id="evaluation.cv"
						placeholder="Link to your cv (website, drive)"
						required
						data-test="cv"
					/>
				</div>
			{/if}

			{#if c.portfolioNeeded}
				<div>
					<Label for="evaluation.portfolio">Portfolio</Label>
					<Input
						name="evaluation.portfolio"
						type="url"
						id="evaluation.portfolio"
						placeholder="Link to your portfolio (website, drive)"
						required
						data-test="motivationalLetter"
					/>
				</div>
			{/if}

			{#if c.motivationalLetterNeeded}
				<div>
					<Label for="evaluation.letter">Cover letter</Label>
					<Textarea
						name="evaluation.letter"
						id="evaluation.letter"
						placeholder="Write / paste your letter here"
						required
						data-test="motivationalLetter"
					/>
				</div>
			{/if}

			<Hr hrClass="bg-gray-300 rounded border-0 dark:bg-gray-700" />

			<Button type="submit">Enroll!</Button>
		</form>
	</div>
</Container>
