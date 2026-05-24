<script lang="ts">
	import Drawer from '$lib/components/common/drawer/Drawer.svelte';
	import type { Category } from '$lib/types/category';
	import { faker } from '@faker-js/faker';

	let {
		mode = 'create' as const,
		hideDrawer = $bindable(true),
		category = undefined,
		onSubmit
	}: {
		mode?: 'create' | 'edit';
		hideDrawer?: boolean;
		category?: Category | undefined;
		onSubmit: (data: Category) => void;
	} = $props();

	let isCreate = $derived(mode === 'create');

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const name = formData.get('name') as string;
		const description = formData.get('description') as string;

		onSubmit?.({
			id: category?.id || faker.string.uuid(),
			name,
			description,
			isActive: category?.isActive ?? true
		});
	}
</script>

<Drawer bind:hidden={hideDrawer} placement="right" title="{isCreate ? 'Add' : 'Edit'} Category">
	<form class="grid gap-6" onsubmit={handleSubmit}>
		<div class="grid gap-2">
			<label for="name" class="text-sm font-medium text-gray-900 dark:text-white">Name</label>
			<input
				id="name"
				name="name"
				required
				placeholder="Name..."
				value={category?.name}
				class="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
			/>
		</div>
		<div class="grid gap-2">
			<label for="description" class="text-sm font-medium text-gray-900 dark:text-white"
				>Description</label
			>
			<input
				id="description"
				name="description"
				required
				placeholder="Description..."
				value={category?.description}
				class="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
			/>
		</div>

		<div class="absolute bottom-0 left-0 flex w-full flex-col justify-center gap-4 p-4">
			<button
				type="submit"
				class="w-full rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
			>
				{isCreate ? 'Add' : 'Edit'} Category
			</button>
			<button
				type="button"
				onclick={() => (hideDrawer = true)}
				class="w-full rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
			>
				Cancel
			</button>
		</div>
	</form>
</Drawer>
