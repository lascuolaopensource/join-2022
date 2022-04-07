<script lang="ts">
	import type { types as t } from 'shared';

	export let enrollment: t.EnrollmentEntity;

	const owner: t.UsersPermissionsUserEntity = enrollment.attributes.owner?.data;
	console.log(owner);
	// const ownerInfo: t.UserInfoEntity = owner?.attributes.userInfo.data;
</script>

<!--  -->

<div>
	<!-- {owner}{ownerInfo} -->
	{#if enrollment.attributes.cvUrl}
		<a
			class="btn btn-tertiary"
			href={enrollment.attributes.cvUrl}
			target="_blank">CV</a
		>
	{/if}
	{#if enrollment.attributes.portfolioUrl}
		<a
			class="btn btn-tertiary"
			href={enrollment.attributes.portfolioUrl}
			target="_blank">Portfolio</a
		>
	{/if}
	{#if enrollment.attributes.motivationalLetter}
		<button>Lettera motivazionale</button>
	{/if}
</div>

<style>
	div {
		padding: var(--s-3);
		border: 1px solid black;
	}
</style>
