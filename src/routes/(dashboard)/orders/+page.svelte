<script lang="ts">
	import { OrderStatusFilter, OrderTable } from '$lib/components/orders';
	import { processOrder, updateOrder, getOrders, createOrder } from '$lib/services/order';
	import { OrderItemStatus, OrderStatus, type Order } from '$lib/types/order';
	import { getFood } from '$lib/services/menu';
	import { getCategories } from '$lib/services/category';
	import type { Menu } from '$lib/types/menu';
	import Drawer from '$lib/components/common/drawer/Drawer.svelte';

	let { data } = $props();

	let ordersData = $state(data.orders);
	let newOrderDrawerHidden = $state(true);
	let filterStatus = $state(Object.values(OrderStatus));
	let selectedQuantities = $state<Record<string, number>>({});
	let selectedCategory = $state<string | null>(null);
	let searchQuery = $state('');
	let selectedTable = $state('Table 1');
	let orderNumber = $state(`#${1000 + Math.floor(Math.random() * 9999)}`);

	let orders = $derived(
		ordersData.filter((order) => {
			return filterStatus.includes(order.status);
		})
	);

	let categories = $derived(getCategories());

	let food = $derived(getFood());

	let filteredFood = $derived(
		food.filter((item) => {
			if (selectedCategory && item.categoryId !== selectedCategory) return false;
			if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
			return true;
		})
	);

	let totalItems = $derived(Object.values(selectedQuantities).reduce((sum, qty) => sum + qty, 0));

	let totalAmount = $derived(
		Object.entries(selectedQuantities).reduce((sum, [id, qty]) => {
			const item = food.find((m) => m.id === id);
			return sum + (item ? item.price * qty : 0);
		}, 0)
	);

	let selectedItems = $derived(
		Object.entries(selectedQuantities)
			.filter(([, qty]) => qty > 0)
			.map(([id, qty]) => {
				const item = food.find((m) => m.id === id)!;
				return { item, qty };
			})
			.sort((a, b) => a.item.name.localeCompare(b.item.name))
	);

	function addItem(id: string) {
		selectedQuantities = {
			...selectedQuantities,
			[id]: (selectedQuantities[id] ?? 0) + 1
		};
	}

	function removeItem(id: string) {
		const current = selectedQuantities[id] ?? 0;
		if (current <= 1) {
			const next = { ...selectedQuantities };
			delete next[id];
			selectedQuantities = next;
		} else {
			selectedQuantities = { ...selectedQuantities, [id]: current - 1 };
		}
	}

	function clearSelection() {
		selectedQuantities = {};
	}

	function handleUpdateOrder(order: Order) {
		updateOrder(processOrder(order));
		ordersData = getOrders();
	}

	function handleCreateOrder() {
		if (totalItems === 0) return;
		const items: Menu[] = Object.entries(selectedQuantities).flatMap(([id, qty]) => {
			const menu = food.find((m) => m.id === id)!;
			return Array.from({ length: qty }, () => menu);
		});
		createOrder({
			order: orderNumber,
			table: selectedTable,
			date: new Date(),
			items: items.map((m) => ({ ...m, status: OrderItemStatus.PENDING }))
		});
		selectedQuantities = {};
		selectedCategory = null;
		searchQuery = '';
		selectedTable = 'Table 1';
		orderNumber = `#${1000 + Math.floor(Math.random() * 9999)}`;
		newOrderDrawerHidden = true;
		ordersData = getOrders();
	}
</script>

<div class="flex min-h-96 flex-col gap-6">
	<div class="flex items-end justify-between gap-2">
		<OrderStatusFilter bind:filterStatus />

		<button
			onclick={() => (newOrderDrawerHidden = false)}
			class="inline-flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
		>
			<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 4v16m8-8H4"
				/></svg
			>
			New Order
		</button>
	</div>

	<OrderTable {orders} onUpdateOrder={handleUpdateOrder} />
</div>

<Drawer
	bind:hidden={newOrderDrawerHidden}
	title="New Order"
	placement="right"
	widthClass="w-[520px]"
>
	<div class="flex h-full flex-col">
		{#if totalItems > 0}
			<div
				class="shrink-0 border-b border-gray-200 bg-primary-50 px-1 pb-3 pt-2 dark:border-gray-600 dark:bg-primary-900/20"
			>
				<div class="mb-2 flex items-center justify-between">
					<span class="text-sm font-semibold text-gray-900 dark:text-white"
						>Selected ({totalItems} items)</span
					>
					<button
						onclick={clearSelection}
						class="text-xs text-red-600 hover:underline dark:text-red-400"
					>
						Clear all
					</button>
				</div>
				<div class="flex flex-wrap gap-1.5">
					{#each selectedItems as { item, qty } (item.id)}
						<span
							class="inline-flex items-center gap-1 rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-200"
						>
							{item.name}
							<span class="opacity-70">x{qty}</span>
							<button
								onclick={() => removeItem(item.id)}
								class="ml-0.5 leading-none hover:text-red-600"
							>
								&times;
							</button>
						</span>
					{/each}
				</div>
				<div class="mt-2 text-right text-sm font-semibold text-gray-900 dark:text-white">
					Total: RM {totalAmount.toFixed(2)}
				</div>
			</div>
		{/if}

		<div class="flex shrink-0 items-center gap-3 py-3">
			<div class="flex-1">
				<label
					for="order-table"
					class="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Table</label
				>
				<select
					id="order-table"
					bind:value={selectedTable}
					class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
				>
					<option value="Table 1">Table 1</option>
					<option value="Table 2">Table 2</option>
					<option value="Table 3">Table 3</option>
					<option value="Table 4">Table 4</option>
					<option value="Table 5">Table 5</option>
					<option value="Takeaway">Takeaway</option>
				</select>
			</div>
			<div class="flex-1">
				<label
					for="order-number"
					class="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Order #</label
				>
				<input
					id="order-number"
					type="text"
					bind:value={orderNumber}
					class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
				/>
			</div>
		</div>

		<div class="flex shrink-0 flex-wrap gap-1 pb-3">
			<button
				onclick={() => (selectedCategory = null)}
				class="rounded-full px-3 py-1 text-xs font-medium {selectedCategory === null
					? 'bg-primary-700 text-white'
					: 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}"
			>
				All
			</button>
			{#each categories as cat (cat.id)}
				<button
					onclick={() => (selectedCategory = cat.id)}
					class="rounded-full px-3 py-1 text-xs font-medium {selectedCategory === cat.id
						? 'bg-primary-700 text-white'
						: 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}"
				>
					{cat.name}
				</button>
			{/each}
		</div>

		<div class="relative shrink-0 pb-3">
			<svg
				class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/>
			</svg>
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Search items..."
				class="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
			/>
		</div>

		<div class="min-h-0 flex-1 overflow-y-auto">
			{#if filteredFood.length === 0}
				<p class="py-8 text-center text-sm text-gray-400 dark:text-gray-500">No items found</p>
			{:else}
				<div class="flex flex-col gap-1">
					{#each filteredFood as item (item.id)}
						<div
							class="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2.5 dark:border-gray-600"
						>
							<div class="min-w-0 flex-1">
								<p class="truncate text-sm font-medium text-gray-900 dark:text-white">
									{item.name}
								</p>
								<p class="text-xs text-gray-500 dark:text-gray-400">RM {item.price.toFixed(2)}</p>
							</div>
							<div class="flex shrink-0 items-center gap-1.5">
								{#if (selectedQuantities[item.id] ?? 0) > 0}
									<button
										onclick={() => removeItem(item.id)}
										aria-label="Remove one {item.name}"
										class="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-500 dark:text-gray-300 dark:hover:bg-gray-600"
									>
										<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
											><path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M20 12H4"
											/></svg
										>
									</button>
								{/if}
								{#if (selectedQuantities[item.id] ?? 0) > 0}
									<span class="w-5 text-center text-sm font-medium text-gray-900 dark:text-white"
										>{selectedQuantities[item.id]}</span
									>
								{/if}
								<button
									onclick={() => addItem(item.id)}
									aria-label="Add one {item.name}"
									class="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-500 dark:text-gray-300 dark:hover:bg-gray-600"
								>
									<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M12 4v16m8-8H4"
										/></svg
									>
								</button>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<button
			onclick={handleCreateOrder}
			disabled={totalItems === 0}
			class="mt-3 shrink-0 w-full rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 disabled:opacity-50 dark:bg-primary-600 dark:hover:bg-primary-700"
		>
			Create Order
			{#if totalItems > 0}
				({totalItems} items &middot; RM {totalAmount.toFixed(2)})
			{/if}
		</button>
	</div>
</Drawer>
