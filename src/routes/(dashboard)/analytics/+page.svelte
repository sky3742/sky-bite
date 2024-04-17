<script lang="ts">
	import { AnalyticHeader } from '$lib/components/analytics';
	import { BarChart, LineChart, PieChart } from '$lib/components/common';
	import { Card } from 'flowbite-svelte';
	import { UsersGroupOutline } from 'flowbite-svelte-icons';

	export let data;
</script>

<div class="grid grid-cols-3 gap-4">
	<Card>
		<AnalyticHeader title="Weekly Sales" value="MYR 2,345">
			<UsersGroupOutline slot="icon" />
		</AnalyticHeader>

		<BarChart series={data.weeklySales} />
	</Card>

	<Card>
		<AnalyticHeader title="Monthly Sales" value="MYR 34,567">
			<UsersGroupOutline slot="icon" />
		</AnalyticHeader>

		<LineChart series={data.monthlySales.series} categories={data.monthlySales.categories} />
	</Card>

	<Card>
		<AnalyticHeader title="Monthly Order Category" value="200">
			<UsersGroupOutline slot="icon" />
		</AnalyticHeader>

		<PieChart series={data.categorySales.series} labels={data.categorySales.labels} />
	</Card>

	<Card>
		<AnalyticHeader title="Weekly Orders" value="345">
			<UsersGroupOutline slot="icon" />
		</AnalyticHeader>

		<BarChart series={data.weeklyOrders} />
	</Card>

	<Card>
		<AnalyticHeader title="Monthly Orders" value="1,234">
			<UsersGroupOutline slot="icon" />
		</AnalyticHeader>

		<LineChart series={data.monthlyOrder.series} categories={data.monthlyOrder.categories} />
	</Card>

	<Card>
		<AnalyticHeader title="Top Items Order" value="2,345">
			<UsersGroupOutline slot="icon" />
		</AnalyticHeader>

		<BarChart series={data.topItemsOrder} horizontal />
	</Card>
</div>
