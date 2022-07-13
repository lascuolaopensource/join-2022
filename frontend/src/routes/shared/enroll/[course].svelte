<script lang="ts" context="module">
	import { req } from '$lib/requestUtils';
	import { helpers as h, endpoints as e, types as t } from 'shared';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params, fetch, session, stuff }: any) {
		const slug = params.course;
		const course = await req.getCourseBySlug(slug, fetch);

		// Ci si può ancora iscrivere al corso si ritornano i dati
		if (h.course.isErollmentTime(course.attributes)) {
			return {
				props: {
					slug,
					course
				}
			};
		}
		// Altrimenti si reindirizza
		else {
			return {
				status: 302,
				redirect: `/shared/enroll/closed`
			};
		}
	}
</script>

<script lang="ts">
	import { user } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { s } from '$lib/strings';
	import * as yup from 'yup';
	import { validation as v } from 'shared';
	import { addEmailExistsTest } from '$lib/validators';
	import { createForm } from 'svelte-forms-lib';
	import {
		Form,
		FormError,
		TextField,
		TextAreaField,
		setFormError,
		SubmitButton
	} from '$lib/components/form';
	import { Loading, Callout, HR } from '$lib/components';
	import { Link, Title } from '$lib/ui';

	/**
	 * Exports
	 */

	export let slug: string;
	export let course: t.CourseEntity;

	/**
	 * Sending the user away if already enrolled
	 */

	const promise = (async function () {
		if ($user) {
			const res = await req.isUserEnrolled(course.id);
			if (res.enrolled) {
				await goto('/inside/profile');
			}
		}
	})();

	/**
	 * Getting course info to build form
	 */

	// Shorthand for course attributes
	const c: t.Course = course.attributes as t.Course;

	// Getting course info
	const paymentNeeded = h.course.isPaymentNeeded(c);
	const evaluationNeeded = h.course.isEvaluationNeeded(c);

	/**
	 * Form - Initial values
	 */

	const initialValues = e.EnrollValues;

	// Setting courseId
	initialValues.courseId = course.id;

	// Setting evaluation
	initialValues.evaluation.cvNeeded = c.cvNeeded;
	initialValues.evaluation.letterNeeded = c.motivationalLetterNeeded;
	initialValues.evaluation.portfolioNeeded = c.portfolioNeeded;

	// Adding user
	if ($user) {
		initialValues.contacts.exists = true;
	}

	/**
	 * Form - Extending base schema with async test
	 */

	v.setYupDefaultMessages();

	const validationSchema = e.EnrollSchema.shape({
		contacts: e.ContactsSchema.shape({
			email: yup.string().when('exists', {
				is: false,
				then: (schema) => addEmailExistsTest(schema).required(),
				otherwise: (schema) => schema.nullable().optional()
			})
		})
	});

	/**
	 * Form - Submit fn
	 */

	async function onSubmit(values: e.EnrollReq) {
		try {
			// Getting response
			const res = await req.enroll(values);

			// Going to payment
			if (res.paymentId) {
				await goto(`/shared/payment/${res.paymentId}`);
			}
			//
			else {
				await goto(`/shared/enroll/confirm`);
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
		validationSchema,
		onSubmit
	});
</script>

<!--  -->

{#await promise}
	<Loading />
{:then res}
	{#if $user}
		<Link href="/inside/course/{slug}" backlink margin>Torna al corso</Link>
	{/if}

	<p class="text-gray-900">{course.attributes.title}</p>
	<Title margin>Iscriviti</Title>

	{#if !$user}
		<Callout>
			Hai già un account Join? Prima di iscriverti al corso
			<a href="/">effettua il login</a>!
		</Callout>
	{/if}

	<div class="spacer" style="margin-top: var(--s-3)" />

	<Form {formContext}>
		<!-- Info -->
		{#if !$user || c.motivationalLetterNeeded || paymentNeeded}
			<HR mode="light" />

			<div>
				<h2>{s.enroll.info.title}</h2>
				<ul>
					<!--  -->
					{#if !$user}
						<li>{s.enroll.info.accountCreation}</li>
					{/if}
					<!--  -->
					{#if c.motivationalLetterNeeded}
						<li>{s.enroll.info.letter}</li>
					{/if}
					<!--  -->
					{#if paymentNeeded}
						<li>{s.enroll.info.payment}</li>
					{/if}
				</ul>
			</div>
		{/if}

		<HR mode="light" />

		<!-- Contatti -->

		{#if !$user}
			<TextField name="contacts.name" labelText="Nome" />
			<TextField name="contacts.surname" labelText="Cognome" />
			<TextField name="contacts.email" labelText="Email" type="email" />
		{/if}

		<TextField
			name="contacts.phone"
			labelText="Numero di telefono"
			type="text"
			helperText="Ti chiediamo il numero di telefono per contattarti solo in casi di urgenza. Sarà eliminato al termine del corso."
		/>

		<HR mode="light" />

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
			<TextAreaField
				name="evaluation.letter"
				labelText="Lettera motivazionale"
			/>
		{/if}

		{#if evaluationNeeded}
			<HR mode="light" />
		{/if}

		<!-- Error -->

		<FormError />

		<!-- Submit -->

		<SubmitButton>
			{#if paymentNeeded}
				{s.enroll.button.payment}
			{:else}
				{s.enroll.button.enroll}
			{/if}
		</SubmitButton>
	</Form>
{/await}

<!--  -->
<style>
	h1 {
		margin-bottom: var(--s-3);
	}
</style>
