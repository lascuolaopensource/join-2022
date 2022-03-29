<script lang="ts">
	import { user } from '$lib/stores';
</script>

Il pagamento non esiste!
{#if $user}
	<a href="/inside" class="backlink">Torna alla home</a>
{/if}
