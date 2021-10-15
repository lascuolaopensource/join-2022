<script lang="ts">
	export let color: string = '#FFFFFF';
	export let unit: string = 'px';
	export let durationNum: number = 0.6;
	export let durationUnit: string = 's';
	export let size: string = '60';
</script>

<div class="wrapper" style="--size:{size}{unit}; --duration: {durationNum}{durationUnit};">
	{#each [3, 2, 1] as i}
		<div
			class="dot"
			style="--dotSize:{+size * 0.25}{unit}; --color:{color}; animation-delay:  {i *
				(+durationNum / 10)}{durationUnit};"
		/>
	{/each}
</div>

<style>
	.wrapper {
		height: var(--size);
		width: var(--size);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.dot {
		height: var(--dotSize);
		width: var(--dotSize);
		background-color: var(--color);
		margin: 2px;
		display: inline-block;
		border-radius: var(--border-radius);
		animation: sync var(--duration) ease-in-out infinite alternate both running;
	}
	@-webkit-keyframes sync {
		33% {
			-webkit-transform: translateY(10px);
			transform: translateY(10px);
		}
		66% {
			-webkit-transform: translateY(-10px);
			transform: translateY(-10px);
		}
		100% {
			-webkit-transform: translateY(0);
			transform: translateY(0);
		}
	}
	@keyframes sync {
		33% {
			-webkit-transform: translateY(10px);
			transform: translateY(10px);
		}
		66% {
			-webkit-transform: translateY(-10px);
			transform: translateY(-10px);
		}
		100% {
			-webkit-transform: translateY(0);
			transform: translateY(0);
		}
	}
</style>
