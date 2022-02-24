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
				slug,
				courseRes: response.ok && (await response.json())
			}
		};
	}
</script>

<script lang="ts">
	import { post, endpoints, headersAuth } from '$lib/requestUtils';
	import { user } from '$lib/stores';

	import { MultipageForm, setFormError } from '$lib/components/form';
	import { Contacts, Evaluation } from '$lib/components/formPages';
	import type { t, f } from 'shared';
	import { h } from 'shared';
	import { goto } from '$app/navigation';

	//

	export let slug: string;
	export let courseRes: t.CourseEntityResponseCollection;

	//

	// Extracting course
	const course: t.CourseEntity = courseRes.data[0];
	// Shorthand for course attributes
	const c: t.Course = course.attributes;

	// Getting course props
	const letterNeeded = c.motivationalLetterNeeded;
	const portfolioNeeded = c.portfolioNeeded;
	const cvNeeded = c.cvNeeded;

	//

	// Form pages
	const pages = [Contacts, Evaluation];

	// Removing evaluation if not needed
	if (!h.isEvaluationNeeded(c)) {
		pages.pop();
	}

	async function handleSubmit(values: f.enroll.enFormBody) {
		try {
			// Getting evaluation
			let evaluation: f.evaluation.evType = null;
			if (h.isEvaluationNeeded(c)) {
				evaluation = values[1];
			}

			// Building payload
			const payload: f.enroll.enType = {
				courseId: course.id,
				contacts: values[0],
				evaluationNeeded: h.isEvaluationNeeded(c),
				evaluation
			};

			// Getting response
			const req: f.enroll.enResponse = await post(
				fetch,
				endpoints.enroll,
				payload,
				headersAuth()
			);

			console.log(req);

			// Going to payment
			if (req.paymentId) {
				goto(`/inside/corsi/${slug}/iscriviti/payment-${req.paymentId}`);
			} else {
				goto(`/inside/corsi/${slug}/iscriviti/confirm`);
			}
		} catch (e) {
			setFormError(e);
		}
	}
</script>

<!--  -->

<MultipageForm
	{pages}
	{handleSubmit}
	extraProps={{
		letterNeeded,
		portfolioNeeded,
		cvNeeded,
		userExists: $user ? true : false
	}}
/>
