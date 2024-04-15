<script lang="ts">
	import Drawer from '$lib/components/common/drawer/Drawer.svelte';
	import type { Category } from '$lib/types/category';
	import { Button, Input, Label } from 'flowbite-svelte';

	export let mode: 'create' | 'edit' = 'create';
	export let hideDrawer = true;
	export let category: Category | undefined = undefined;
	export let onSubmit: (data: Category) => void;

	$: isCreate = mode === 'create';

	function handleSubmit(event: SubmitEvent) {
		const formData = new FormData(event.target as HTMLFormElement);
		const name = formData.get('name') as string;
		const description = formData.get('description') as string;

		onSubmit?.({
			id: category?.id || '',
			name,
			description,
			isActive: category?.isActive
		});
	}
</script>

<Drawer bind:hidden={hideDrawer} placement="right" title="{isCreate ? 'Add' : 'Edit'} Category">
	<form class="grid gap-6" on:submit|preventDefault={handleSubmit}>
		<div class="grid gap-2">
			<Label for="name">Name</Label>
			<Input id="name" name="name" required placeholder="Name..." value={category?.name} />
		</div>
		<div class="grid gap-2">
			<Label for="description">Description</Label>
			<Input
				id="description"
				name="description"
				required
				placeholder="Description..."
				value={category?.description}
			/>
		</div>

		<div class="absolute bottom-0 left-0 flex w-full flex-col justify-center gap-4 p-4">
			<Button type="submit" class="w-full">
				{#if isCreate}Add{:else}Edit{/if}
				Category
			</Button>
			<Button color="light" class="w-full" on:click={() => (hideDrawer = true)}>Cancel</Button>
		</div>
	</form>
</Drawer>
