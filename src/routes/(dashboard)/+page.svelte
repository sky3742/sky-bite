<script lang="ts">
	import { AnalyticCard } from '$lib/components/common';
	import { OrderTable } from '$lib/components/orders';
	import { processOrder } from '$lib/services/order';
	import { type Order } from '$lib/types/order';
	import { OrderStatus } from '$lib/types/order.js';
	import { Heading } from 'flowbite-svelte';

	export let data;

	$: orders = data.orders.filter((order) =>
		[OrderStatus.NEW, OrderStatus.INPROGRESS].includes(order.status)
	);

	$: summary = {
		new: data.orders.filter((order) => order.status === OrderStatus.NEW).length,
		inProgress: data.orders.filter((order) => order.status === OrderStatus.INPROGRESS).length,
		completed: data.orders.filter((order) => order.status === OrderStatus.COMPLETED).length,
		completedSales: data.orders
			.filter((order) => order.status === OrderStatus.COMPLETED)
			.reduce((acc, curr) => acc + curr.amount, 0)
			.toLocaleString(undefined, {
				style: 'currency',
				currency: 'MYR'
			}),
		pendingSales: data.orders
			.filter((order) => order.status === OrderStatus.INPROGRESS)
			.reduce((acc, curr) => acc + curr.amount, 0)
			.toLocaleString(undefined, {
				style: 'currency',
				currency: 'MYR'
			})
	};

	function handleUpdateOrder(order: Order) {
		const orderIndex = data.orders.findIndex((item) => item.id === order.id);
		data.orders[orderIndex] = processOrder(order);
		data.orders = [...data.orders];
	}
</script>

<div class="flex flex-col gap-6">
	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
		<AnalyticCard label="New Orders" value={summary.new} />
		<AnalyticCard label="In-Progress Orders" value={summary.inProgress} />
		<AnalyticCard label="Completed Orders" value={summary.completed} />
		<AnalyticCard label="Pending Sales" value={summary.pendingSales} />
		<AnalyticCard label="Completed Sales" value={summary.completedSales} />
	</div>

	<div class="flex flex-col gap-6">
		<Heading tag="h3">Orders</Heading>
		<OrderTable {orders} onUpdateOrder={handleUpdateOrder} />
	</div>
</div>
