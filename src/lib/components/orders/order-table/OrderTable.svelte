<script lang="ts">
	import { OrderItemStatus, OrderTypeLabel, type Order, type OrderItem } from '$lib/types/order';
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
		<TableHeadCell>Type</TableHeadCell>
		<TableHeadCell>Status</TableHeadCell>
		<TableHeadCell>Action</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each orders as order (order.id)}
			<TableBodyRow on:click={() => (openOrderId = openOrderId === order.id ? '' : order.id)}>
				<TableBodyCell>{order.order}</TableBodyCell>
				<TableBodyCell>
					{order.date.toLocaleTimeString(navigator.language, {
						hour12: true,
						hour: '2-digit',
						minute: '2-digit'
					})}
				</TableBodyCell>
				<TableBodyCell>{order.amount.toLocaleString(navigator.language)}</TableBodyCell>
				<TableBodyCell>
					{OrderTypeLabel[order.orderType]}
				</TableBodyCell>
				<TableBodyCell>
					<OrderStatusBadge status={order.status} />
				</TableBodyCell>
				<TableBodyCell>
					<Button color="red" outline on:click={() => handleCancelOrder(order)} size="xs">
						Cancel
					</Button>
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
