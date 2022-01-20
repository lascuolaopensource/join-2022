ao
<!-- <script lang="ts">
	import { mutation, setClient } from 'svelte-apollo';
	import createApolloClient from '$lib/requestUtils/createGQLClient';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import userStore from '$lib/stores/userStore';
	const ID: string = $page.params.corso;

	let lettera_motivazionale: string = '';

	const client = createApolloClient(localStorage.getItem('token'));
	setClient(client);

	const post_iscrizione = mutation(POST_ISCRIZIONE);

	async function iscriviti() {
		try {
			await post_iscrizione({
				variables: { userID: $userStore.id, corsoID: ID, lettera_motivazionale }
			});
			goto(`/inside/corsi/${ID}/conferma`);
		} catch (error) {
			console.log(error);
		}
	}
</script>

<p>Iscrizione di un corso</p>
<form on:submit|preventDefault={iscriviti}>
	<textarea bind:value={lettera_motivazionale} />
	<button type="submit">Iscriviti!</button>
</form> -->
