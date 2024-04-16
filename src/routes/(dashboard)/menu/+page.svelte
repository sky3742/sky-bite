<script lang="ts">
	import ManageMenuTab from '../../../lib/components/menu/manage-menu-tab/ManageMenuTab.svelte';

	import { ManageCategoryTab } from '$lib/components/categories';
	import type { Category } from '$lib/types/category';
	import type { Menu } from '$lib/types/menu';
	import { Heading, Tabs } from 'flowbite-svelte';

	export let data;

	const handleCreateItem = (item: Menu) => {
		data.menu = [...data.menu, item];
	};
	const handleEditItem = (item: Menu) => {
		const menuIndex = data.menu.findIndex(({ id }) => id === item.id);
		data.menu[menuIndex] = item;
		data.menu = [...data.menu];
	};
	const handleDeleteItem = (item: Menu) => {
		data.menu = data.menu.filter(({ id }) => id !== item.id);
	};

	const handleCreateCategory = (category: Category) => {
		data.categories = [...data.categories, category];
	};
	const handleEditCategory = (category: Category) => {
		const catIndex = data.categories.findIndex(({ id }) => id === category.id);
		data.categories[catIndex] = category;
		data.categories = [...data.categories];
	};
	const handleDeleteCategory = (category: Category) => {
		data.categories = data.categories.filter(({ id }) => id !== category.id);
	};
</script>

<div class="grid gap-2">
	<Heading tag="h3">Menu</Heading>

	<div class="relative">
		<Tabs style="underline" divider={false}>
			<ManageCategoryTab
				categories={data.categories}
				onCreate={handleCreateCategory}
				onEdit={handleEditCategory}
				onDelete={handleDeleteCategory}
			/>

			{#each data.categories as category}
				<ManageMenuTab
					categories={data.categories}
					currentCategory={category}
					menu={data.menu.filter(({ categoryId }) => categoryId === category.id)}
					onCreate={handleCreateItem}
					onEdit={handleEditItem}
					onDelete={handleDeleteItem}
				/>
			{/each}
		</Tabs>
	</div>
</div>
