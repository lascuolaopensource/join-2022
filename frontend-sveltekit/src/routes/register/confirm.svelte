<script lang="ts">
	import user from '$lib/stores/userStore';
</script>

<h1>Grazie per aver confermato l'email!</h1>
<p>
	Super! Hai confermato la tua email! Ora puoi fare tutto quello che vuoi :D
</p>
{#if $user}
	<a href="/inside">Vai alla home</a>
{:else}
	<a href="/">Vai al login</a>
{/if}

<style>
	h1 {
		margin-bottom: var(--s-2);
	}

	p {
		margin-bottom: var(--s-2);
	}
</style>
