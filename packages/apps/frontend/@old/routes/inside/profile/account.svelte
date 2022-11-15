<script lang="ts">
	import { user, userInfo } from '$lib/stores';
	import { Callout } from '$lib/components';
</script>

<!--  -->

{#if $user && $userInfo}
	<div class="space-y-4">
		<Callout>Per modificare le tue info personali, contatta gli admin</Callout>
		<div>
			<p><strong>Nome e cognome</strong></p>
			<p>{$userInfo.name} {$userInfo.surname}</p>
		</div>
		<div>
			<p><strong>Email</strong></p>
			<p>{$user.email}</p>
		</div>
	</div>
{/if}
