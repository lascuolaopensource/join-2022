<script lang="ts" context="module">
	import { baseUrl, sdk } from '$lib/requestUtils';

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
	import { MultipageForm } from '$lib/components/form';
	import {
		Billing,
		Contacts,
		Evaluation
	} from '$lib/components/enrollmentForm';

	//

	export let course;
	let c = course.data[0] as sdk.CourseEntity;

	async function handleSubmit(values) {
		console.log(values);
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
