<script lang="ts">
	export let href: string;
</script>

<a class="text-blue-700 hover:text-white hover:bg-blue-700" {href}><slot /></a>
