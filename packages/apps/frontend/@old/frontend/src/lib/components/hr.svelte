<script lang="ts">
	export let mode: 'light' | 'dark' = 'dark';
</script>

<!--  -->

<hr
	class="border-t-1"
	class:border-gray-500={mode == 'dark'}
	class:border-gray-300={mode == 'light'}
/>
