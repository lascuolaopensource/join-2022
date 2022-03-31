<script lang="ts">
	import { NavbarItem, NavbarSecondary } from '$lib/components';
</script>

<!--  -->

<NavbarSecondary>
	<NavbarItem href="/inside/courses/active">Corsi attivi</NavbarItem>
	<NavbarItem href="/inside/courses/archive">Archivio corsi</NavbarItem>
</NavbarSecondary>
<slot />
