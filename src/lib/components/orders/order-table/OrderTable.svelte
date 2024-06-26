<script lang="ts">
	import { OrderItemStatus, OrderStatus, type Order, type OrderItem } from '$lib/types/order';
	import {
		Button,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { OrderMenuTable, OrderStatusBadge } from '..';

	export let orders: Order[] = [];
	export let onUpdateOrder: (order: Order) => void;

	let openOrderId = '';

	function handleUpdateItem(order: Order, orderItem: OrderItem) {
		const itemIndex = order.items.findIndex((item) => item.id === orderItem.id);
		order.items[itemIndex] = orderItem;
		onUpdateOrder?.(order);
	}

	function handleCancelOrder(order: Order) {
		onUpdateOrder?.({
			...order,
			items: order.items.map((item) => ({
				...item,
				status: OrderItemStatus.CANCELED
			}))
		});
	}
</script>

<Table hoverable shadow>
	<TableHead>
		<TableHeadCell>Order</TableHeadCell>
		<TableHeadCell>Time</TableHeadCell>
		<TableHeadCell>Sales</TableHeadCell>
		<TableHeadCell>Table</TableHeadCell>
		<TableHeadCell>Status</TableHeadCell>
		<TableHeadCell>Action</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each orders as order (order.id)}
			<TableBodyRow on:click={() => (openOrderId = openOrderId === order.id ? '' : order.id)}>
				<TableBodyCell>{order.order}</TableBodyCell>
				<TableBodyCell>
					{order.date.toLocaleTimeString(undefined, {
						hour12: true,
						hour: '2-digit',
						minute: '2-digit'
					})}
				</TableBodyCell>
				<TableBodyCell>{order.amount.toLocaleString()}</TableBodyCell>
				<TableBodyCell>
					{order.table}
				</TableBodyCell>
				<TableBodyCell>
					<OrderStatusBadge status={order.status} />
				</TableBodyCell>
				<TableBodyCell>
					{#if order.status === OrderStatus.NEW}
						<Button color="red" outline on:click={() => handleCancelOrder(order)} size="xs">
							Cancel
						</Button>
					{/if}
				</TableBodyCell>
			</TableBodyRow>
			{#if openOrderId === order.id}
				<TableBodyRow>
					<TableBodyCell colspan="6">
						<OrderMenuTable
							menu={order.items}
							onUpdateItem={(item) => handleUpdateItem(order, item)}
						/>
					</TableBodyCell>
				</TableBodyRow>
			{/if}
		{/each}
	</TableBody>
</Table>
