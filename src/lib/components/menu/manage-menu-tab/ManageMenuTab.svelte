<script lang="ts">
	import { DeleteModal } from '$lib/components/common';
	import { MenuFormModal, MenuTable } from '$lib/components/menu';
	import type { Category } from '$lib/types/category';
	import type { Menu } from '$lib/types/menu';
	import { TabItem } from 'flowbite-svelte';
	import { EyeSlashOutline } from 'flowbite-svelte-icons';

	export let categories: Category[];
	export let currentCategory: Category;
	export let menu: Menu[];
	export let onCreate: (item: Menu) => void;
	export let onEdit: (item: Menu) => void;
	export let onDelete: (item: Menu) => void;

	let isCreate = true;
	let showMenuFormModal = false;
	let showDeleteModal = false;
	let selectedMenu: Menu;
</script>

<TabItem title={currentCategory.name}>
	<div slot="title" class="flex gap-2">
		{currentCategory.name}
		{#if !currentCategory.isActive}
			<EyeSlashOutline />
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
		onToggle={() => {}}
	/>
</TabItem>

<MenuFormModal
	mode={isCreate ? 'create' : 'edit'}
	bind:openModal={showMenuFormModal}
	menu={isCreate ? undefined : selectedMenu}
	{categories}
	onSubmit={(data) => {
		isCreate ? onCreate(data) : onEdit(data);
	}}
/>

<DeleteModal bind:showModal={showDeleteModal} onConfirm={() => onDelete(selectedMenu)} />
