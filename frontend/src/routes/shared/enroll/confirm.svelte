<script lang="ts">
	import { user } from '$lib/stores';
</script>

Grazie per esserti iscritto!<br />
Ti notificheremo sugli sviluppi del corso :)
{#if $user}
	<a href="/inside">Torna alla home</a>
{/if}
