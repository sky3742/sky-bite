<script lang="ts">
	import { OrderStatus, OrderStatusLabel } from '$lib/types/order';
	import { Badge } from 'flowbite-svelte';
	import type { BadgeProps } from 'flowbite-svelte/Badge.svelte';

	export let status: OrderStatus = OrderStatus.NEW;
	export let onRemove: (() => void) | undefined = undefined;

	$: color = {
		[OrderStatus.NEW]: 'blue',
		[OrderStatus.INPROGRESS]: 'yellow',
		[OrderStatus.COMPLETED]: 'green',
		[OrderStatus.CANCELED]: 'red'
	}[status] as BadgeProps['color'];
</script>

<Badge {color} dismissable={!!onRemove} on:close={onRemove}>
	{OrderStatusLabel[status]}
</Badge>
