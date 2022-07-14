<script lang="ts">
	import { NavbarSecondary, NavLink } from '$lib/components';
</script>

<!--  -->

<NavbarSecondary>
	<NavLink href="/inside/courses/active" theme="medium">Corsi attivi</NavLink>
	<NavLink href="/inside/courses/archive" theme="medium">Archivio corsi</NavLink
	>
</NavbarSecondary>
<slot />
