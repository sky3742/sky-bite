<script lang="ts">
	import { OrderStatus, OrderStatusLabel } from '$lib/types/order';

	let {
		status = OrderStatus.NEW,
		onRemove = undefined
	}: {
		status?: OrderStatus;
		onRemove?: (() => void) | undefined;
	} = $props();

	let colorClasses = $derived.by(() => {
		const map: Record<OrderStatus, string> = {
			[OrderStatus.NEW]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
			[OrderStatus.INPROGRESS]:
				'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
			[OrderStatus.COMPLETED]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
			[OrderStatus.CANCELED]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
		};
		return map[status];
	});
</script>

<span
	class="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium {colorClasses}"
>
	{OrderStatusLabel[status]}
	{#if onRemove}
		<button aria-label="Remove" onclick={onRemove} class="inline-flex items-center">
			<svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"
				><path
					fill-rule="evenodd"
					d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
					clip-rule="evenodd"
				/></svg
			>
		</button>
	{/if}
</span>
