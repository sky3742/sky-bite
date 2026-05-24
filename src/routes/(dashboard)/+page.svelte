<script lang="ts">
	import { AnalyticCard } from '$lib/components/common';
	import { OrderTable } from '$lib/components/orders';
	import { updateOrder, processOrder, getOrders } from '$lib/services/order';
	import { OrderStatus, type Order } from '$lib/types/order';

	let ordersData = $state(getOrders());

	let orders = $derived(
		ordersData.filter((order) => [OrderStatus.NEW, OrderStatus.INPROGRESS].includes(order.status))
	);

	let summary = $derived({
		new: ordersData.filter((order) => order.status === OrderStatus.NEW).length,
		inProgress: ordersData.filter((order) => order.status === OrderStatus.INPROGRESS).length,
		completed: ordersData.filter((order) => order.status === OrderStatus.COMPLETED).length,
		completedSales: ordersData
			.filter((order) => order.status === OrderStatus.COMPLETED)
			.reduce((acc, curr) => acc + curr.amount, 0)
			.toLocaleString(undefined, {
				style: 'currency',
				currency: 'MYR'
			}),
		pendingSales: ordersData
			.filter((order) => order.status === OrderStatus.INPROGRESS)
			.reduce((acc, curr) => acc + curr.amount, 0)
			.toLocaleString(undefined, {
				style: 'currency',
				currency: 'MYR'
			})
	});

	function handleUpdateOrder(order: Order) {
		updateOrder(processOrder(order));
		ordersData = getOrders();
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
		<h3 class="text-lg font-semibold text-gray-900 dark:text-white">Orders</h3>
		<OrderTable {orders} onUpdateOrder={handleUpdateOrder} />
	</div>
</div>
