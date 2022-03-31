<script lang="ts">
	import { NavbarItem, NavbarSecondary } from '$lib/components';
</script>

<!--  -->

<NavbarSecondary>
	<NavbarItem href="/inside/profile/enrollments">Iscrizioni</NavbarItem>
	<NavbarItem href="/inside/profile/account">Profilo</NavbarItem>
</NavbarSecondary>

<div class="container">
	<slot />
</div>
