<script lang="ts" context="module">
	import { baseUrl } from '$lib/requestUtils';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params, fetch, session, stuff }) {
		const slug = params.corso;
		const response = await fetch(
			baseUrl + '/api/courses?filters[slug][$eq]=' + slug
		);

		return {
			status: response.status,
			props: {
				course: response.ok && (await response.json())
			}
		};
	}
</script>

<script lang="ts">
	import type { sdk } from '$lib/requestUtils';
	import { post, endpoints, headersAuth } from '$lib/requestUtils';
	import { user } from '$lib/stores';

	import { MultipageForm, setFormError } from '$lib/components/form';
	import {
		Billing,
		Contacts,
		Evaluation
	} from '$lib/components/enrollmentForm';
	import type { validators } from 'shared';

	//

	export let course;
	let c = course.data[0] as sdk.CourseEntity;

	const pages = [Contacts, Evaluation, Billing];
	// In extraprops bisogna passare anche 'userexists'

	function isBillingNeeded(c: sdk.CourseEntity): boolean {
		return c.attributes.price > 0;
	}

	function isEvaluationNeeded(c: sdk.CourseEntity): boolean {
		return (
			c.attributes.cvNeeded ||
			c.attributes.motivationalLetterNeeded ||
			c.attributes.portfolioNeeded
		);
	}

	async function handleSubmit(values) {
		try {
			// Getting evaluation
			let evaluation = null;
			if (isEvaluationNeeded(c)) {
				evaluation = values[1];
			}

			// Getting billing
			let billing = null;
			if (isEvaluationNeeded(c) && isBillingNeeded(c)) {
				billing = values[2];
			} else if (!isEvaluationNeeded(c) && isBillingNeeded(c)) {
				billing = values[1];
			}

			const payload: validators.FEnroll = {
				courseId: parseInt(c.id),
				contacts: values[0],
				evaluationNeeded: isEvaluationNeeded(c),
				evaluation,
				billingNeeded: isBillingNeeded(c),
				billing
			};

			const req = await post(fetch, endpoints.enroll, payload, headersAuth());
		} catch (e) {
			setFormError(e);
		}
	}
</script>

<MultipageForm
	{pages}
	{handleSubmit}
	extraProps={{
		letterNeeded: true,
		portfolioNeeded: true,
		cvNeeded: true,
		userExists: $user ? true : false
	}}
/>
