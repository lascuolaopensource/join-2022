<script lang="ts">
	import { userInfo } from '$lib/stores';

	import { Container, Title, Link } from '$lib/components';
</script>

<!--  -->

<Container>
	<Title margin>Ciao {$userInfo?.name}!</Title>
	<div class="flex flex-col">
		<Link href="/inside/courses/active">Corsi</Link>
		<Link href="/inside/tools">Strumenti e spazi</Link>
	</div>
</Container>
