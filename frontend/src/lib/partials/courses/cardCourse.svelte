<script lang="ts">
	export let title: string;
	export let deadline: string;
	export let href: string;
</script>

<!--  -->

<a {href} class="block p-4 w-full bg-gray-300 hover:bg-gray-400">
	<h3 class="text-lg font-bold">
		{title}
	</h3>
	<p>Deadline: {deadline}</p>
</a>
