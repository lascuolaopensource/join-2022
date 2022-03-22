<script lang="ts">
	import { page } from '$app/stores';
	import { user } from '$lib/stores';

	const courseTitle = decodeURIComponent($page.params.course);
</script>

Grazie per esserti iscritto a {courseTitle}!<br />
Ti notificheremo sugli sviluppi del corso :)
{#if $user}
	<a href="/inside">Torna alla home</a>
{/if}
