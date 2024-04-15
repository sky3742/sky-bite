<script lang="ts">
	import type { Category } from '$lib/types/category';
	import {
		Button,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch,
		Toggle
	} from 'flowbite-svelte';
	import { EditOutline, PlusOutline, TrashBinOutline } from 'flowbite-svelte-icons';

	export let categories: Category[] = [];

	export let onCreate: () => void;
	export let onEdit: (category: Category) => void;
	export let onDelete: (category: Category) => void;
	export let onToggle: (category: Category) => void;

	let searchValue = '';

	$: filteredCategories = categories.filter((category) => {
		return category.name.toLowerCase().includes(searchValue.toLowerCase());
	});
</script>

<div class="max-w-full overflow-auto">
	<TableSearch
		innerDivClass="flex p-4 justify-between items-center"
		searchClass="relative"
		bind:inputValue={searchValue}
	>
		<Button class="flex gap-2" slot="header" on:click={onCreate}>
			<PlusOutline />
			Add Category
		</Button>

		<TableHead>
			<TableHeadCell>Name</TableHeadCell>
			<TableHeadCell>Description</TableHeadCell>
			<TableHeadCell>Options</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each filteredCategories as category}
				<TableBodyRow>
					<TableBodyCell class="max-w-xs overflow-clip text-wrap">
						{category.name}
					</TableBodyCell>
					<TableBodyCell class="max-w-sm overflow-clip text-wrap">
						{category.description}
					</TableBodyCell>
					<TableBodyCell class="w-0">
						<div class="flex items-center">
							<Toggle
								bind:checked={category.isActive}
								on:change={() => onToggle({ ...category })}
							/>
							<Button
								color="none"
								outline
								class="border-none"
								size="xs"
								on:click={() => onEdit({ ...category })}
							>
								<EditOutline ariaLabel="Edit" />
							</Button>
							<Button
								color="red"
								outline
								class="border-none"
								size="xs"
								on:click={() => onDelete({ ...category })}
							>
								<TrashBinOutline ariaLabel="Delete" />
							</Button>
						</div>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</TableSearch>
</div>
