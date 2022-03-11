<script lang="ts">
	import { NavbarItem } from '$lib/components';
</script>

<!--  -->

<div>
	<NavbarItem href="/inside/courses/active">Corsi attivi</NavbarItem>
	<NavbarItem href="/inside/courses/archive">Archivio corsi</NavbarItem>
</div>
<slot />

<!--  -->
<style>
	div {
		background-color: gray;
		padding: var(--s-1);
	}
</style>
