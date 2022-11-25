<script lang="ts">
	import type { PageData } from './$types';
	import { TitleAndText, Container } from '$lib/components';

	export let data: PageData;
</script>

<Container padding>
	<TitleAndText title="Courses" text="All the courses." />
</Container>
