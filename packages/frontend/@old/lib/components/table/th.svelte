<script lang="ts">
	export let colspan = 1;
</script>

<th
	class="border border-slate-300 py-2 px-4 bg-slate-100 text-left font-bold"
	{colspan}
>
	<slot />
</th>
