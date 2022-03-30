<!-- <script lang="ts">
	import createApolloClient from '$lib/requestUtils/createGQLClient';
	import { setClient, query } from 'svelte-apollo';

	// Setting the GraphQL client
	const client = createApolloClient(localStorage.getItem('token'));
	setClient(client);

	const enrollments = query(GET_enrollments);
</script>

le tue enrollments ai corsi:

{#if $enrollments.loading}
	loading...
{:else if $enrollments.error}
	Error!
{:else if $enrollments.data}
	<ul>
		{#each $enrollments.data.me.enrollments as iscrizione}
			<li>{iscrizione.course.titolo} {iscrizione.lettera_motivazionale}</li>
		{/each}
	</ul>
{/if} -->
Qui ci saranno tutti i tuoi corsi
