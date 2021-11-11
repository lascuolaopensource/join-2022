<script lang="ts">
	export let href: string;
	export let label: string;
</script>

<div>
	<a class="back" {href}>← {label}</a>
</div>

<style>
	div {
		width: 100%;
		padding-bottom: var(--s-2);
	}
</style>
