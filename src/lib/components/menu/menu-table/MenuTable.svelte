<script lang="ts">
	import type { Menu } from '$lib/types/menu';

	let {
		menu = [] as Menu[],
		onCreate,
		onEdit,
		onDelete,
		onToggle
	}: {
		menu?: Menu[];
		onCreate: () => void;
		onEdit: (item: Menu) => void;
		onDelete: (item: Menu) => void;
		onToggle: (item: Menu) => void;
	} = $props();

	let searchValue = $state('');

	let filteredMenu = $derived(
		menu.filter((item) => {
			return item.name.toLowerCase().includes(searchValue.toLowerCase());
		})
	);
</script>

<div class="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
	<div class="flex items-center justify-between p-4">
		<div class="relative">
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
				bind:value={searchValue}
				placeholder="Search..."
				class="rounded-lg border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
			/>
		</div>
		<button
			onclick={onCreate}
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
			Add product
		</button>
	</div>

	<div class="overflow-x-auto">
		<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
			<thead
				class="border-y border-gray-200 bg-gray-50 text-xs uppercase text-gray-700 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-400"
			>
				<tr>
					<th scope="col" class="px-6 py-3">Name</th>
					<th scope="col" class="px-6 py-3">Description</th>
					<th scope="col" class="px-6 py-3">Price</th>
					<th scope="col" class="px-6 py-3">Options</th>
				</tr>
			</thead>
			<tbody>
				{#each filteredMenu as item (item.id)}
					<tr class="border-b border-gray-200 last:border-0 dark:border-gray-700">
						<td
							class="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
						>
							{item.name}
						</td>
						<td class="max-w-sm overflow-hidden text-ellipsis whitespace-nowrap px-6 py-4">
							{item.description}
						</td>
						<td class="px-6 py-4">{item.price.toFixed(2)}</td>
						<td class="px-6 py-4">
							<div class="flex items-center gap-2">
								<button
									onclick={() => onToggle(item)}
									role="switch"
									aria-checked={item.active}
									aria-label="Toggle {item.name}"
									class="relative inline-flex h-5 w-9 cursor-pointer items-center rounded-full transition-colors"
									class:bg-primary-600={item.active}
									class:bg-gray-300={!item.active}
								>
									<span
										class="inline-block h-4 w-4 rounded-full bg-white shadow-sm transition"
										class:translate-x-[1.125rem]={item.active}
										class:translate-x-[2px]={!item.active}
									></span>
								</button>
								<button
									aria-label="Edit {item.name}"
									onclick={() => onEdit(item)}
									class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
								>
									<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"
										><path
											d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
										/></svg
									>
								</button>
								<button
									aria-label="Delete {item.name}"
									onclick={() => onDelete(item)}
									class="rounded-lg p-2 text-red-600 hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-900/20"
								>
									<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"
										><path
											fill-rule="evenodd"
											d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
											clip-rule="evenodd"
										/></svg
									>
								</button>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
