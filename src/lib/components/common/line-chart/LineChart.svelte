<script lang="ts">
	import { onMount } from 'svelte';
	import ApexCharts from 'apexcharts';
	import type { ApexOptions, ApexAxisChartSeries } from 'apexcharts';

	let chartEl: HTMLDivElement;
	let chart: ApexCharts | null = $state(null);

	let {
		series,
		categories,
		chartOptions = {}
	}: {
		series: ApexAxisChartSeries;
		categories: string[];
		chartOptions?: ApexOptions;
	} = $props();

	const buildOptions = (): ApexOptions => ({
		chart: {
			height: 200,
			type: 'line' as const,
			dropShadow: { enabled: false },
			toolbar: { show: false }
		},
		tooltip: { enabled: true, x: { show: false } },
		dataLabels: { enabled: false },
		stroke: { width: 4, curve: 'smooth' },
		grid: { show: false, padding: { left: 10, right: 10, top: -26 } },
		legend: { show: false },
		xaxis: {
			categories,
			labels: {
				show: true,
				style: { cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400' }
			},
			axisBorder: { show: false },
			axisTicks: { show: false }
		},
		yaxis: { show: false },
		series,
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
