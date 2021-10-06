<script lang="ts">
	// import { goto } from '$app/navigation';
	// import { page } from '$app/stores';
	// import userStore from '$lib/stores/userStore';
	// const ID: string = $page.params.corso;

	// let lettera_motivazionale: string = '';

	// const client = createApolloClient(localStorage.getItem('token'));
	// setClient(client);

	async function get_iscrizioni() {
		const res = await fetch('http://localhost:1337/users/me', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		});
		console.log(res.json());
	}

	get_iscrizioni();

	// const post_iscrizione = mutation(POST_ISCRIZIONE);
</script>

le tue prenotazioni ai corsi
