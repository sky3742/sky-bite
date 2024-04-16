<script lang="ts">
	import { OrderStatusFilter } from '$lib/components/orders';
	import OrderTable from '$lib/components/orders/order-table/OrderTable.svelte';
	import { processOrder } from '$lib/services/order';
	import { OrderStatus, type Order } from '$lib/types/order';
	import { Button, Heading } from 'flowbite-svelte';
	import { PlusOutline } from 'flowbite-svelte-icons';

	export let data;

	let filterStatus = Object.values(OrderStatus);

	$: orders = data.orders.filter((order) => {
		return filterStatus.includes(order.status);
	});

	function handleUpdateOrder(order: Order) {
		const orderIndex = data.orders.findIndex((item) => item.id === order.id);
		data.orders[orderIndex] = processOrder(order);
		data.orders = [...data.orders];
	}
</script>

<div class="flex min-h-96 flex-col gap-6">
	<Heading tag="h3">Orders</Heading>

	<div class="flex items-end justify-between gap-2">
		<OrderStatusFilter bind:filterStatus />

		<Button>
			<PlusOutline />
			New Order
		</Button>
	</div>

	<OrderTable {orders} onUpdateOrder={handleUpdateOrder} />
</div>
