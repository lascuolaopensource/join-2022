<script lang="ts">
	export let title: string;
	export let deadline: string;
	export let href: string;
</script>

<a {href}>
	<h3>
		{title}
	</h3>
	<p>Deadline: {deadline}</p>
	<h3 class="arrow">→</h3>
</a>

<style>
	a {
		display: block;
		text-decoration: none;
		padding: 20px;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.1);
	}

	.arrow {
		width: 100%;
		text-align: right;
	}
</style>
