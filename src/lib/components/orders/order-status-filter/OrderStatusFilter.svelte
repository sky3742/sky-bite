<script lang="ts">
	import { OrderStatus, OrderStatusLabel } from '$lib/types/order';
	import { MultiSelect, Span } from 'flowbite-svelte';
	import { OrderStatusBadge } from '..';

	export let filterStatus = Object.values(OrderStatus);
</script>

<div class="flex flex-col gap-2">
	<Span class="font-semibold">Filter status</Span>
	<MultiSelect
		class="min-w-96"
		dropdownClass="max-w-sm overflow-visible"
		items={Object.values(OrderStatus).map((status) => ({
			name: OrderStatusLabel[status],
			value: status
		}))}
		bind:value={filterStatus}
		let:item
		let:clear
	>
		<OrderStatusBadge status={item.value} onRemove={clear} />
	</MultiSelect>
</div>
