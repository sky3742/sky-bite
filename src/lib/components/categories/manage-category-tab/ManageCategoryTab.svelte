<script lang="ts">
	import { DeleteModal } from '$lib/components/common';
	import type { Category } from '$lib/types/category';
	import { TabItem } from 'flowbite-svelte';
	import { LayersOutline } from 'flowbite-svelte-icons';
	import { CategoryFormDrawer, CategoryTable } from '..';

	export let categories: Category[] = [];
	export let onCreate: (category: Category) => void;
	export let onEdit: (category: Category) => void;
	export let onDelete: (category: Category) => void;

	let isCreate = true;
	let hideCategoryFormDrawer = true;
	let showDeleteModal = false;
	let selectedCategory: Category;
</script>

<TabItem open>
	<div slot="title" class="flex gap-2">
		<LayersOutline />
		Manage Categories
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
		onToggle={onEdit}
	/>
</TabItem>

<CategoryFormDrawer
	mode={isCreate ? 'create' : 'edit'}
	bind:hideDrawer={hideCategoryFormDrawer}
	category={isCreate ? undefined : selectedCategory}
	onSubmit={(data) => {
		hideCategoryFormDrawer = true;
		isCreate ? onCreate(data) : onEdit(data);
	}}
/>

<DeleteModal bind:showModal={showDeleteModal} onConfirm={() => onDelete(selectedCategory)} />
