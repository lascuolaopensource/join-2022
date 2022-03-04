<script lang="ts" context="module">
	import { req } from '$lib/requestUtils';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params, fetch, session, stuff }) {
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
	import { user } from '$lib/stores';

	import { createForm } from 'svelte-forms-lib';
	import {
		Form,
		TextField,
		TextAreaField,
		setFormError
	} from '$lib/components/form';
	import type { t } from 'shared';
	import { f } from 'shared';
	import { h } from 'shared';
	import { goto } from '$app/navigation';
	import SubmitButton from '$lib/components/form/submitButton.svelte';

	/**
	 * Exports
	 */

	export let slug: string;
	export let course: t.CourseEntity;

	/**
	 * Getting course info to build form
	 */

	// Shorthand for course attributes
	const c: t.Course = course.attributes;

	// Getting course info
	const paymentNeeded = h.isPaymentNeeded(c);
	const evaluationNeeded = h.isEvaluationNeeded(c);

	/**
	 * Form - Initial values
	 */

	const initialValues = f.enroll.enValues;

	// Setting courseId
	initialValues.courseId = course.id;

	// Setting user
	if ($user) {
		initialValues.contacts.exists = true;
		initialValues.contacts.user = null;
	}

	// Setting evaluation
	initialValues.evaluation.cvNeeded = c.cvNeeded;
	initialValues.evaluation.letterNeeded = c.motivationalLetterNeeded;
	initialValues.evaluation.portfolioNeeded = c.portfolioNeeded;

	/**
	 * Form - Submit fn
	 */

	async function onSubmit(values: f.enroll.enRequest) {
		try {
			// Getting response
			const res = await req.enroll(values);

			// Going to payment
			if (res.paymentId) {
				await goto(`/shared/payments/${res.paymentId}`);
			}
			//
			else {
				await goto(`/shared/${slug}/enrollConfirm`);
			}
		} catch (e) {
			setFormError(e);
		}
	}

	/**
	 * Creating form
	 */

	const formContext = createForm({
		initialValues,
		validationSchema: f.enroll.enSchema,
		onSubmit
	});
</script>

<!--  -->

<Form {formContext}>
	<!-- Contatti -->

	{#if !$user}
		<TextField name="contacts.user.name" labelText="Nome" />
		<TextField name="contacts.user.surname" labelText="Cognome" />
		<TextField name="contacts.user.email" labelText="Email" type="email" />
	{/if}

	<TextField
		name="contacts.phone"
		labelText="Numero di telefono"
		type="text"
		helperText="Ti chiediamo il numero di telefono per contattarti solo in casi di urgenza. Sarà eliminato al termine del corso."
	/>

	<hr />

	<!-- Valutazione -->

	{#if c.cvNeeded}
		<TextField name="evaluation.cv" labelText="Link al CV" type="text" />
	{/if}
	{#if c.portfolioNeeded}
		<TextField
			name="evaluation.portfolio"
			labelText="Link al portfolio"
			type="text"
		/>
	{/if}
	{#if c.motivationalLetterNeeded}
		<TextAreaField name="evaluation.letter" labelText="Lettera motivazionale" />
	{/if}

	{#if evaluationNeeded}
		<hr />
	{/if}

	<!-- Submit -->

	<SubmitButton>
		{#if paymentNeeded}
			Vai al pagamento
		{:else}
			Iscriviti!
		{/if}
	</SubmitButton>
</Form>
