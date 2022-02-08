<script lang="ts">
	import { page } from '$app/stores';
	import { GQLCLient, headersAuth, endpoints } from '$lib/requestUtils';
	import { course, user } from '$lib/stores';

	import { Loading } from '$lib/components';
	import { lsGetToken } from '$lib/localStorageUtils';

	/**
	 * Fetching User
	 */

	async function checkUser() {
		try {
			// Se c'è il token
			// si prova ad ottenere l'utente
			// che viene salvato nello store
			if (lsGetToken()) {
				const res = await fetch(endpoints.me + '?populate=*', {
					headers: headersAuth()
				});
				const data = await res.json();
				$user = data;
			}
			// Se il token non c'è
			// l'utente è nullo
			else {
				$user = null;
			}
		} catch (err) {
			throw new Error(err);
		}
	}

	/**
	 * Fetching Corso
	 */

	const client = GQLCLient();

	async function getCorso() {
		// Fetching the course basic info (id, title, slug)
		const data = await client.getCourseBySlug({ slug: $page.params.corso });
		// And we save it the store
		$course = data.courses.data[0];
	}

	/**
	 * Funzione di setup
	 */

	async function setup() {
		await checkUser();
		await getCorso();
		return {};
	}

	const promise = setup();
</script>

<!--  -->

{#await promise}
	<Loading />
{:then ok}
	<slot />
{:catch error}
	{error}
{/await}
