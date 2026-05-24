<script lang="ts">
	import { OrderItemStatus, OrderItemStatusLabel, type OrderItem } from '$lib/types/order';

	let {
		menu = [] as OrderItem[],
		onUpdateItem
	}: { menu?: OrderItem[]; onUpdateItem: (item: OrderItem) => void } = $props();
</script>

<div class="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
	<table class="mx-auto w-auto text-left text-sm text-gray-500 dark:text-gray-400">
		<thead>
			<tr
				class="border-b border-gray-200 text-xs uppercase text-gray-700 dark:border-gray-700 dark:text-gray-400"
			>
				<th scope="col" class="px-4 py-2">Order Item</th>
				<th scope="col" class="px-4 py-2">Status</th>
				<th scope="col" class="px-4 py-2">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each menu as item (item.id)}
				<tr class="border-b border-gray-100 last:border-0 dark:border-gray-700">
					<td
						class="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"
					>
						{item.name}
					</td>
					<td class="px-4 py-2 whitespace-nowrap">
						{OrderItemStatusLabel[item.status]}
					</td>
					<td class="px-4 py-2 whitespace-nowrap">
						{#if item.status === OrderItemStatus.PENDING}
							<div class="flex items-center gap-2">
								<button
									onclick={() => onUpdateItem({ ...item, status: OrderItemStatus.COMPLETED })}
									class="rounded-lg border border-green-600 px-3 py-1 text-xs font-medium text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-900/20"
								>
									Complete
								</button>
								<button
									onclick={() => onUpdateItem({ ...item, status: OrderItemStatus.CANCELED })}
									class="rounded-lg border border-red-600 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-900/20"
								>
									Cancel
								</button>
							</div>
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
