<script lang="ts">
	import { user } from '$lib/stores';
</script>

Il tuo pagamento è stato già effettuato!
{#if $user}
	<a href="/inside" class="backlink">Torna alla home</a>
{/if}
