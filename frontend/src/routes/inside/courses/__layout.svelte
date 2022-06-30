<script lang="ts">
	import { NavbarSecondary } from '$lib/components';
	import { NavLink } from '$lib/ui';
</script>

<!--  -->

<NavbarSecondary>
	<NavLink href="/inside/courses/active" theme="medium">Corsi attivi</NavLink>
	<NavLink href="/inside/courses/archive" theme="medium">Archivio corsi</NavLink
	>
</NavbarSecondary>
<slot />
