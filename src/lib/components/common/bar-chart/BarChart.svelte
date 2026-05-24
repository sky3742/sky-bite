<script lang="ts">
	import { onMount } from 'svelte';
	import ApexCharts from 'apexcharts';
	import type { ApexOptions, ApexAxisChartSeries, ApexNonAxisChartSeries } from 'apexcharts';

	let chartEl: HTMLDivElement;
	let chart: ApexCharts | null = $state(null);

	let {
		series,
		chartOptions = {},
		horizontal = false
	}: {
		series: ApexAxisChartSeries | ApexNonAxisChartSeries;
		chartOptions?: ApexOptions;
		horizontal?: boolean;
	} = $props();

	const buildOptions = (): ApexOptions => ({
		chart: {
			type: 'bar' as const,
			height: 200,
			toolbar: { show: false }
		},
		plotOptions: {
			bar: {
				horizontal,
				columnWidth: '70%',
				borderRadiusApplication: 'end',
				borderRadius: 8
			}
		},
		tooltip: { shared: true, intersect: false },
		states: {
			hover: { filter: { type: 'darken' } }
		},
		stroke: { show: true, width: 0, colors: ['transparent'] },
		grid: { show: false, strokeDashArray: 4, padding: { left: 2, right: 2, top: -14 } },
		dataLabels: { enabled: false },
		legend: { show: false },
		xaxis: {
			floating: false,
			labels: {
				show: true,
				style: { cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400' }
			},
			axisBorder: { show: false },
			axisTicks: { show: false }
		},
		yaxis: { show: false },
		fill: { opacity: 1 },
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
