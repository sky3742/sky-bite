<script lang="ts">
	import { Chart } from 'flowbite-svelte';
	import type { ChartProps } from 'flowbite-svelte/Chart.svelte';

	export let series: ApexAxisChartSeries; //ChartProps['options']['series'];
	export let categories: string[];
	export let chartOptions: ChartProps['options'] = {};

	const options: ChartProps['options'] = {
		chart: {
			height: 200,
			type: 'line',
			dropShadow: {
				enabled: false
			},
			toolbar: {
				show: false
			}
		},
		tooltip: {
			enabled: true,
			x: {
				show: false
			}
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			width: 4,
			curve: 'smooth'
		},
		grid: {
			show: false,
			padding: {
				left: 10,
				right: 10,
				top: -26
			}
		},
		legend: {
			show: false
		},
		xaxis: {
			categories,
			labels: {
				show: true,
				style: {
					cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
				}
			},
			axisBorder: {
				show: false
			},
			axisTicks: {
				show: false
			}
		},
		yaxis: {
			show: false
		},
		...chartOptions,
		series
	};
</script>

<Chart {options} />
