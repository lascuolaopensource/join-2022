<script lang="ts">
	import { userInfo } from '$lib/stores';

	import { Container } from '$lib/components';
	import { Title, Link } from '$lib/ui';
</script>

<!--  -->

<Container>
	<Title margin>Ciao {$userInfo?.name}!</Title>
	<div class="flex flex-col">
		<Link href="/inside/courses/active">Corsi</Link>
		<Link href="/inside/courses/active">Strumenti e spazi</Link>
	</div>
</Container>
