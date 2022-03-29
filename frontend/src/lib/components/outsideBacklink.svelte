<script lang="ts">
	export let href: string;
	export let text: string;
</script>

<div>
	<a class="out__backlink" {href}>← {text}</a>
</div>

<style>
	div {
		width: 100%;
		padding-bottom: var(--s-2);
	}
</style>
