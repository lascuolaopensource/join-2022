<script lang="ts">
	import { user } from '$lib/stores';
</script>

Purtroppo le iscrizioni al corso sono chiuse! :(
{#if $user}
	<a href="/inside/courses/active">Vai ai corsi</a>
{/if}
