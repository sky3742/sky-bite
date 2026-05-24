<script lang="ts">
	let {
		showModal = $bindable(),
		onConfirm,
		title = 'Delete item'
	}: {
		showModal?: boolean;
		onConfirm: () => void;
		title?: string;
	} = $props();

	function stopProp(e: Event) {
		e.stopPropagation();
	}
</script>

{#if showModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50"
		onclick={() => (showModal = false)}
		onkeydown={(e) => {
			if (e.key === 'Escape') showModal = false;
		}}
		role="presentation"
	>
		<div
			class="mx-auto max-w-sm rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800"
			onclick={stopProp}
			onkeydown={stopProp}
			role="presentation"
		>
			<svg
				class="mx-auto h-11 w-11 text-gray-400 dark:text-gray-500"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
				/>
			</svg>
			<p class="mt-4 text-center text-gray-500 dark:text-gray-400">
				{title}
			</p>
			<div class="mt-6 flex items-center justify-center gap-4">
				<button
					onclick={() => (showModal = false)}
					class="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
				>
					No, cancel
				</button>
				<button
					onclick={onConfirm}
					class="rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
				>
					Yes, I'm sure
				</button>
			</div>
		</div>
	</div>
{/if}
