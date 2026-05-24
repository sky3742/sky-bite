<script lang="ts">
	import { ManageMenuTab } from '$lib/components/menu';
	import { ManageCategoryTab } from '$lib/components/categories';
	import type { Category } from '$lib/types/category';
	import type { Menu } from '$lib/types/menu';
	import {
		createMenuItem,
		updateMenuItem,
		deleteMenuItem,
		toggleMenuItemActive,
		getFood
	} from '$lib/services/menu';
	import {
		createCategory,
		updateCategory,
		deleteCategory,
		toggleCategoryActive,
		getCategories
	} from '$lib/services/category';

	let { data } = $props();

	let categoriesData = $state(data.categories);
	let menuData = $state(data.menu);
	let activeTab = $state<'categories' | string>('categories');

	function refresh() {
		categoriesData = getCategories();
		menuData = getFood();
	}

	const handleCreateItem = (item: Menu) => {
		createMenuItem(item);
		refresh();
	};
	const handleEditItem = (item: Menu) => {
		updateMenuItem(item);
		refresh();
	};
	const handleDeleteItem = (item: Menu) => {
		deleteMenuItem(item.id);
		refresh();
	};
	const handleToggleItem = (item: Menu) => {
		toggleMenuItemActive(item.id);
		refresh();
	};

	const handleCreateCategory = (category: Category) => {
		createCategory(category);
		refresh();
	};
	const handleEditCategory = (category: Category) => {
		updateCategory(category);
		refresh();
	};
	const handleDeleteCategory = (category: Category) => {
		deleteCategory(category.id);
		refresh();
	};
	const handleToggleCategory = (category: Category) => {
		toggleCategoryActive(category.id);
		refresh();
	};
</script>

<div class="flex flex-col gap-6">
	<div class="border-b border-gray-200 dark:border-gray-700">
		<nav class="flex gap-4">
			<button
				onclick={() => (activeTab = 'categories')}
				class="border-b-2 px-4 py-2 text-sm font-medium transition-colors"
				class:border-primary-600:text-primary-600={activeTab === 'categories'}
				class:border-transparent:text-gray-500={activeTab !== 'categories'}
				class:border-primary-600={activeTab === 'categories'}
				class:text-primary-600={activeTab === 'categories'}
				class:hover:text-gray-700={activeTab !== 'categories'}
				class:dark:border-primary-500:dark:text-primary-500={activeTab === 'categories'}
				class:dark:text-gray-400={activeTab !== 'categories'}
				class:dark:hover:text-gray-300={activeTab !== 'categories'}
			>
				Manage Categories
			</button>
			{#each categoriesData as category (category.id)}
				<button
					onclick={() => (activeTab = category.id)}
					class="border-b-2 px-4 py-2 text-sm font-medium transition-colors"
					class:border-primary-600:text-primary-600={activeTab === category.id}
					class:border-transparent:text-gray-500={activeTab !== category.id}
					class:border-primary-600={activeTab === category.id}
					class:text-primary-600={activeTab === category.id}
					class:dark:border-primary-500:dark:text-primary-500={activeTab === category.id}
				>
					{category.name}
				</button>
			{/each}
		</nav>
	</div>

	{#if activeTab === 'categories'}
		<ManageCategoryTab
			categories={categoriesData}
			onCreate={handleCreateCategory}
			onEdit={handleEditCategory}
			onDelete={handleDeleteCategory}
			onToggle={handleToggleCategory}
		/>
	{:else}
		{#each categoriesData as category (category.id)}
			{#if activeTab === category.id}
				<ManageMenuTab
					categories={categoriesData}
					currentCategory={category}
					menu={menuData.filter(({ categoryId }) => categoryId === category.id)}
					onCreate={handleCreateItem}
					onEdit={handleEditItem}
					onDelete={handleDeleteItem}
					onToggle={handleToggleItem}
				/>
			{/if}
		{/each}
	{/if}
</div>
