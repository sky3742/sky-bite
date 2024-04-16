<script lang="ts">
	import { OrderItemStatus, OrderItemStatusLabel, type OrderItem } from '$lib/types/order';
	import {
		Button,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';

	export let menu: OrderItem[] = [];
	export let onUpdateItem: (item: OrderItem) => void;
</script>

<Table class="m-auto w-auto">
	<TableHead>
		<TableHeadCell>Order Item</TableHeadCell>
		<TableHeadCell>Status</TableHeadCell>
		<TableHeadCell>Actions</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each menu as item}
			<TableBodyRow>
				<TableBodyCell class="max-w-xs overflow-clip text-wrap">
					{item.name}
				</TableBodyCell>
				<TableBodyCell>{OrderItemStatusLabel[item.status]}</TableBodyCell>
				<TableBodyCell>
					{#if item.status === 'pending'}
						<div class="flex items-center gap-2">
							<Button
								color="green"
								outline
								size="xs"
								on:click={() => onUpdateItem({ ...item, status: OrderItemStatus.COMPLETED })}
							>
								Complete
							</Button>

							<Button
								color="red"
								outline
								on:click={() => onUpdateItem({ ...item, status: OrderItemStatus.CANCELED })}
								size="xs"
							>
								Cancel
							</Button>
						</div>
					{/if}
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
