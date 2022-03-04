<script lang="ts">
	import { userInfo } from '$lib/stores';
</script>

<!--  -->

<div class="container">
	<h1>Ciao {$userInfo.name}!</h1>
	<a href="/inside/corsi">Beccati sti corsi</a>
</div>

<!--  -->
<style>
	a {
		display: block;
		margin-top: var(--s-2);
	}
</style>
