<script lang="ts">
	import { ManageCategoryTab } from '$lib/components/categories';
	import type { Category } from '$lib/types/category';
	import { Heading, TabItem, Tabs } from 'flowbite-svelte';
	import { EyeSlashOutline } from 'flowbite-svelte-icons';

	export let data;

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
				<TabItem title={category.name}>
					<div slot="title" class="flex gap-2">
						{category.name}
						{#if !category.isActive}
							<EyeSlashOutline />
						{/if}
					</div>
				</TabItem>
			{/each}
		</Tabs>
	</div>
</div>
