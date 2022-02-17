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
	import { post, endpoints } from '$lib/requestUtils';

	import { MultipageForm, setFormError } from '$lib/components/form';
	import {
		Billing,
		Contacts,
		Evaluation
	} from '$lib/components/enrollmentForm';

	//

	export let course;
	let c = course.data[0] as sdk.CourseEntity;

	async function handleSubmit(values) {
		try {
			const req = await post(fetch, endpoints.enroll, values);
		} catch (e) {
			setFormError(e);
		}
	}
</script>

<MultipageForm
	pages={[Contacts, Billing, Evaluation]}
	{handleSubmit}
	extraProps={{
		letterNeeded: true,
		portfolioNeeded: true,
		cvNeeded: true
	}}
/>
