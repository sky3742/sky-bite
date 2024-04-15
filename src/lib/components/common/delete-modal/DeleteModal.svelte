<script lang="ts">
	import { Button, Modal, P } from 'flowbite-svelte';
	import { TrashBinSolid } from 'flowbite-svelte-icons';

	export let title = '';
	export let showModal: boolean;
	export let onConfirm: () => void;
</script>

<Modal {title} bind:open={showModal} autoclose outsideclose size="sm" class="w-full">
	<TrashBinSolid class="mx-auto h-11 w-11 text-gray-400 dark:text-gray-500" />
	<P align="center">Are you sure you want to delete this item?</P>
	<div class="flex items-center justify-center gap-4">
		<Button color="light">No, cancel</Button>
		<Button color="red" on:click={onConfirm}>Yes, I'm sure</Button>
	</div>
</Modal>
