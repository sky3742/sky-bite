<script lang="ts">
	import { onMount } from 'svelte';
	import type { ApexOptions, ApexNonAxisChartSeries, default as ApexCharts } from 'apexcharts';

	let chartEl: HTMLDivElement;
	let chart: ApexCharts | null = $state(null);

	let {
		series,
		labels,
		chartOptions = {}
	}: {
		series: ApexNonAxisChartSeries;
		labels: string[];
		chartOptions?: ApexOptions;
	} = $props();

	const buildOptions = (): ApexOptions => ({
		chart: { height: 200, type: 'pie' as const },
		stroke: { colors: ['white'] },
		plotOptions: {
			pie: { dataLabels: { offset: -25 } }
		},
		dataLabels: { enabled: true },
		legend: { show: false, position: 'bottom' },
		series,
		labels,
		...chartOptions
	});

	onMount(() => {
		import('apexcharts').then(({ default: ApexCharts }) => {
			chart = new ApexCharts(chartEl, buildOptions());
			chart.render();
		});
		return () => chart?.destroy();
	});

	$effect(() => {
		if (chart) {
			chart.updateOptions(buildOptions());
		}
	});
</script>

<div bind:this={chartEl}></div>
