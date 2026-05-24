<script lang="ts">
	import { OrderItemStatus, OrderStatus, type Order, type OrderItem } from '$lib/types/order';
	import { OrderMenuTable, OrderStatusBadge } from '..';
	import { DeleteModal } from '$lib/components/common';

	let {
		orders = [] as Order[],
		onUpdateOrder
	}: { orders?: Order[]; onUpdateOrder: (order: Order) => void } = $props();

	let openOrderId = $state('');
	let showCancelModal = $state(false);
	let cancelOrderId = $state('');

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
		showCancelModal = false;
		cancelOrderId = '';
	}

	function toggleOrder(id: string) {
		openOrderId = openOrderId === id ? '' : id;
	}
</script>

<div
	class="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
>
	<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
		<thead
			class="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-700 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-400"
		>
			<tr>
				<th scope="col" class="px-6 py-3">Order</th>
				<th scope="col" class="px-6 py-3">Time</th>
				<th scope="col" class="px-6 py-3">Sales</th>
				<th scope="col" class="px-6 py-3">Table</th>
				<th scope="col" class="px-6 py-3">Status</th>
				<th scope="col" class="px-6 py-3">Action</th>
			</tr>
		</thead>
		<tbody>
			{#each orders as order (order.id)}
				<tr
					onclick={() => toggleOrder(order.id)}
					class="cursor-pointer border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
				>
					<td class="px-6 py-4 font-medium text-gray-900 dark:text-white">{order.order}</td>
					<td class="px-6 py-4 whitespace-nowrap">
						{order.date.toLocaleTimeString(undefined, {
							hour12: true,
							hour: '2-digit',
							minute: '2-digit'
						})}
					</td>
					<td class="px-6 py-4">{order.amount.toLocaleString()}</td>
					<td class="px-6 py-4">{order.table}</td>
					<td class="px-6 py-4"><OrderStatusBadge status={order.status} /></td>
					<td class="px-6 py-4">
						{#if order.status === OrderStatus.NEW}
							<button
								onclick={(e) => {
									e.stopPropagation();
									cancelOrderId = order.id;
									showCancelModal = true;
								}}
								class="rounded-lg border border-red-600 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-900/20"
							>
								Cancel
							</button>
						{/if}
					</td>
				</tr>
				{#if openOrderId === order.id}
					<tr class="bg-gray-50 dark:bg-gray-800/50">
						<td colspan={6} class="px-6 py-4">
							<OrderMenuTable
								menu={order.items}
								onUpdateItem={(item) => handleUpdateItem(order, item)}
							/>
						</td>
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>
</div>

<DeleteModal
	title="Are you sure you want to cancel this order?"
	bind:showModal={showCancelModal}
	onConfirm={() => {
		showCancelModal = false;
		const order = orders.find((o) => o.id === cancelOrderId);
		if (order) handleCancelOrder(order);
	}}
/>
