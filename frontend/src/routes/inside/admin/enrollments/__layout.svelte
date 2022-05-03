<script lang="ts">
	import { NavbarSecondary, NavbarItem, Container } from '$lib/components';
</script>

<NavbarSecondary>
	<NavbarItem href="/inside/admin/enrollments">Iscrizioni</NavbarItem>
</NavbarSecondary>

<Container>
	<slot />
</Container>
