<script lang="ts">
	import { DeleteModal } from '$lib/components/common';
	import { MenuFormModal, MenuTable } from '$lib/components/menu';
	import type { Category } from '$lib/types/category';
	import type { Menu } from '$lib/types/menu';

	let {
		categories,
		currentCategory,
		menu = [] as Menu[],
		onCreate,
		onEdit,
		onDelete,
		onToggle
	}: {
		categories: Category[];
		currentCategory: Category;
		menu?: Menu[];
		onCreate: (item: Menu) => void;
		onEdit: (item: Menu) => void;
		onDelete: (item: Menu) => void;
		onToggle: (item: Menu) => void;
	} = $props();

	let isCreate = $state(true);
	let showMenuFormModal = $state(false);
	let showDeleteModal = $state(false);
	let selectedMenu = $state<Menu>(undefined!);
</script>

<div>
	<div class="mb-4 flex items-center gap-2">
		<h3 class="text-lg font-semibold text-gray-900 dark:text-white">{currentCategory.name}</h3>
		{#if !currentCategory.isActive}
			<svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
				<path
					fill-rule="evenodd"
					d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
					clip-rule="evenodd"
				/>
				<path
					d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"
				/>
			</svg>
		{/if}
	</div>

	<MenuTable
		{menu}
		onCreate={() => {
			isCreate = true;
			showMenuFormModal = true;
		}}
		onEdit={(item) => {
			selectedMenu = item;
			isCreate = false;
			showMenuFormModal = true;
		}}
		onDelete={(item) => {
			selectedMenu = item;
			showDeleteModal = true;
		}}
		{onToggle}
	/>
</div>

<MenuFormModal
	mode={isCreate ? 'create' : 'edit'}
	bind:openModal={showMenuFormModal}
	menu={isCreate ? undefined : selectedMenu}
	{categories}
	onSubmit={(data) => {
		if (isCreate) onCreate(data);
		else onEdit(data);
	}}
/>

<DeleteModal bind:showModal={showDeleteModal} onConfirm={() => onDelete(selectedMenu)} />
