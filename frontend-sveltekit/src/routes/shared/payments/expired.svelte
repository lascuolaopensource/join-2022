<script lang="ts">
	import { user } from '$lib/stores';
</script>

Il pagamento è scaduto! Contatta gli admin per risolvere la situazione, sono a
tua disposizione :)
{#if $user}
	<a href="/inside" class="backlink">Torna alla home</a>
{/if}
