<script lang="ts">
	import { user } from '$lib/stores';
	import { lsKeys } from '$lib/localStorageUtils';
	import { Title, Link } from '$lib/components';

	// Si svuota il localstorage con il form di pagamento
	localStorage.removeItem(lsKeys.paymentForm);
</script>

<!--  -->

<Title margin>Super!</Title>

<p class="mb-6">
	Grazie per esserti iscritto!<br />
	Ti notificheremo sugli sviluppi del corso :)
</p>

{#if $user}
	<Link href="/inside" backlink>Torna alla home</Link>
{/if}
