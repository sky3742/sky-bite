<script lang="ts">
	import { Chart } from 'flowbite-svelte';
	import type { ChartProps } from 'flowbite-svelte/Chart.svelte';

	export let series: ChartProps['options']['series'];
	export let labels: ChartProps['options']['labels'];
	export let chartOptions: ChartProps['options'] = {};

	const options: ChartProps['options'] = {
		chart: {
			height: 200,
			type: 'pie'
		},
		stroke: {
			colors: ['white']
		},
		plotOptions: {
			pie: {
				dataLabels: {
					offset: -25
				}
			}
		},
		dataLabels: {
			enabled: true
		},
		legend: {
			show: false,
			position: 'bottom'
		},
		yaxis: {
			labels: {
				formatter: (value: number) => value + '%'
			}
		},
		xaxis: {
			labels: {
				formatter: (value: string) => value + '%'
			},
			axisTicks: {
				show: false
			},
			axisBorder: {
				show: false
			}
		},
		...chartOptions,
		series,
		labels
	};
</script>

<Chart {options} />
