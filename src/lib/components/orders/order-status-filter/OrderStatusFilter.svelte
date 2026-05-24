<script lang="ts">
	import { OrderStatus, OrderStatusLabel } from '$lib/types/order';
	import { OrderStatusBadge } from '..';

	let { filterStatus = $bindable(Object.values(OrderStatus)) }: { filterStatus?: OrderStatus[] } =
		$props();

	let open = $state(false);

	function toggleOpen(e: MouseEvent) {
		e.stopPropagation();
		open = !open;
	}

	function handleClickOutside() {
		open = false;
	}

	function stopProp(e: Event) {
		e.stopPropagation();
	}

	function toggleStatus(status: OrderStatus) {
		if (filterStatus.includes(status)) {
			filterStatus = filterStatus.filter((s) => s !== status);
		} else {
			filterStatus = [...filterStatus, status];
		}
	}
</script>

<svelte:window onclick={handleClickOutside} />

<div class="flex flex-col gap-2">
	<span class="text-sm font-semibold text-gray-900 dark:text-white">Filter status</span>
	<div class="relative">
		<button
			onclick={toggleOpen}
			class="flex min-w-72 flex-wrap items-center gap-1 rounded-lg border border-gray-300 bg-gray-50 p-2 text-left text-sm dark:border-gray-600 dark:bg-gray-700"
		>
			{#if filterStatus.length === Object.values(OrderStatus).length}
				<span class="px-2 py-0.5 text-gray-500 dark:text-gray-400">All statuses</span>
			{:else}
				{#each filterStatus as status (status)}
					<OrderStatusBadge {status} onRemove={() => toggleStatus(status)} />
				{/each}
			{/if}
			<svg
				class="ml-auto h-4 w-4 text-gray-400"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M19 9l-7 7-7-7"
				/></svg
			>
		</button>

		{#if open}
			<div
				class="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-700"
				onclick={stopProp}
				onkeydown={stopProp}
				role="presentation"
			>
				<button
					onclick={() => {
						const all = Object.values(OrderStatus);
						if (filterStatus.length === all.length) {
							filterStatus = [];
						} else {
							filterStatus = [...all];
						}
					}}
					class="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
				>
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16m-7 6h7"
						/>
					</svg>
					{filterStatus.length === Object.values(OrderStatus).length
						? 'Deselect all'
						: 'Select all'}
				</button>
				{#each Object.entries(OrderStatusLabel) as [key, label] (key)}
					<button
						onclick={() => toggleStatus(key as OrderStatus)}
						class="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
					>
						<input
							type="checkbox"
							checked={filterStatus.includes(key as OrderStatus)}
							class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
						/>
						{label}
					</button>
				{/each}
			</div>
		{/if}
	</div>
</div>
