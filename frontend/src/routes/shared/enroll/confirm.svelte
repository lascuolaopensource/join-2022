<script lang="ts">
	import { user } from '$lib/stores';
	import { lsKeys } from '$lib/localStorageUtils';

	// Si svuota il localstorage con il form di pagamento
	localStorage.removeItem(lsKeys.paymentForm);
</script>

Grazie per esserti iscritto!<br />
Ti notificheremo sugli sviluppi del corso :)
{#if $user}
	<a href="/inside">Torna alla home</a>
{/if}
