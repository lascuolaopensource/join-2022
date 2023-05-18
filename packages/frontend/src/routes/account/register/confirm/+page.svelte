<script lang="ts">
	import TitleAndLink from '$lib/components/TitleAndLink.svelte';
	import paths from '$lib/constants/paths';
	import { Button, P } from 'flowbite-svelte';
</script>

<TitleAndLink title="Account verified!" />
<P>Yay! Now you're ready to go :)</P>
<Button href={paths.login}>Go to login</Button>
