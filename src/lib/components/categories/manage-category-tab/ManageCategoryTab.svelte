<script lang="ts">
	import { DeleteModal } from '$lib/components/common';
	import type { Category } from '$lib/types/category';
	import { CategoryFormDrawer, CategoryTable } from '..';

	let {
		categories = [] as Category[],
		onCreate,
		onEdit,
		onDelete,
		onToggle
	}: {
		categories?: Category[];
		onCreate: (category: Category) => void;
		onEdit: (category: Category) => void;
		onDelete: (category: Category) => void;
		onToggle: (category: Category) => void;
	} = $props();

	let isCreate = $state(true);
	let hideCategoryFormDrawer = $state(true);
	let showDeleteModal = $state(false);
	let selectedCategory = $state<Category>(undefined!);
</script>

<div>
	<div class="mb-4 flex items-center gap-2">
		<svg class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
			/>
		</svg>
		<h2 class="text-lg font-semibold text-gray-900 dark:text-white">Manage Categories</h2>
	</div>

	<CategoryTable
		{categories}
		onCreate={() => {
			isCreate = true;
			hideCategoryFormDrawer = false;
		}}
		onEdit={(category) => {
			isCreate = false;
			selectedCategory = category;
			hideCategoryFormDrawer = false;
		}}
		onDelete={(category) => {
			selectedCategory = category;
			showDeleteModal = true;
		}}
		{onToggle}
	/>
</div>

<CategoryFormDrawer
	mode={isCreate ? 'create' : 'edit'}
	bind:hideDrawer={hideCategoryFormDrawer}
	category={isCreate ? undefined : selectedCategory}
	onSubmit={(data) => {
		hideCategoryFormDrawer = true;
		if (isCreate) onCreate(data);
		else onEdit(data);
	}}
/>

<DeleteModal bind:showModal={showDeleteModal} onConfirm={() => onDelete(selectedCategory)} />
