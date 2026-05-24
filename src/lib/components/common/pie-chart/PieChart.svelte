<script lang="ts">
	import { onMount } from 'svelte';
	import ApexCharts from 'apexcharts';
	import type { ApexOptions, ApexNonAxisChartSeries } from 'apexcharts';

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
		chart = new ApexCharts(chartEl, buildOptions());
		chart.render();
		return () => chart?.destroy();
	});

	$effect(() => {
		if (chart) {
			chart.updateOptions(buildOptions());
		}
	});
</script>

<div bind:this={chartEl}></div>
