<script lang="ts">
	import { Chart } from 'flowbite-svelte';
	import type { ChartProps } from 'flowbite-svelte/Chart.svelte';

	export let series: ApexAxisChartSeries; // ChartProps['options']['series'];
	export let chartOptions: ChartProps['options'] = {};
	export let horizontal = false;

	const options: ChartProps['options'] = {
		chart: {
			type: 'bar',
			height: 200,

			toolbar: {
				show: false
			}
		},
		plotOptions: {
			bar: {
				horizontal,
				columnWidth: '70%',
				borderRadiusApplication: 'end',
				borderRadius: 8
			}
		},
		tooltip: {
			shared: true,
			intersect: false
		},
		states: {
			hover: {
				filter: {
					type: 'darken',
					value: 1
				}
			}
		},
		stroke: {
			show: true,
			width: 0,
			colors: ['transparent']
		},
		grid: {
			show: false,
			strokeDashArray: 4,
			padding: {
				left: 2,
				right: 2,
				top: -14
			}
		},
		dataLabels: {
			enabled: false
		},
		legend: {
			show: false
		},
		xaxis: {
			floating: false,
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
		fill: {
			opacity: 1
		},
		series,
		...chartOptions
	};
</script>

<Chart {options} />
