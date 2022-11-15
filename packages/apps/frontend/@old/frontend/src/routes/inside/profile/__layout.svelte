<script lang="ts">
	import { NavbarItem, NavbarSecondary, Container } from '$lib/components';
</script>

<!--  -->

<NavbarSecondary>
	<NavbarItem href="/inside/profile/account">Profilo</NavbarItem>
	<NavbarItem href="/inside/profile/enrollments">Iscrizioni corsi</NavbarItem>
	<NavbarItem href="/inside/profile/tools">Prenotazioni strumenti</NavbarItem>
</NavbarSecondary>

<Container>
	<slot />
</Container>
