<script lang="ts">
	let {
		title = 'Drawer title',
		hidden = $bindable(true),
		placement = 'right' as const,
		widthClass = 'w-80',
		children
	}: {
		title?: string;
		hidden?: boolean;
		placement?: 'left' | 'right' | 'top' | 'bottom';
		widthClass?: string;
		children?: import('svelte').Snippet;
	} = $props();

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') hidden = true;
	}

	function close() {
		hidden = true;
	}

	let positionClasses = $derived(
		{
			right: `inset-y-0 right-0 ${widthClass}`,
			left: `inset-y-0 left-0 ${widthClass}`,
			top: 'inset-x-0 top-0 h-80',
			bottom: 'inset-x-0 bottom-0 h-80'
		}[placement]
	);

	let visibleClass = $derived(
		hidden
			? {
					right: 'translate-x-full',
					left: '-translate-x-full',
					top: '-translate-y-full',
					bottom: 'translate-y-full'
				}[placement]
			: 'translate-x-0'
	);
</script>

<svelte:window onkeydown={handleKeydown} />

{#if !hidden}
	<div
		class="fixed inset-0 z-40 bg-gray-900/50 transition-opacity"
		onclick={close}
		onkeydown={(e) => {
			if (e.key === 'Escape') close();
		}}
		role="presentation"
	></div>
{/if}

<div
	class="fixed z-50 flex h-full flex-col overflow-hidden bg-white p-6 shadow-lg transition-transform dark:bg-gray-800 {positionClasses} {visibleClass}"
>
	<div class="flex shrink-0 items-center justify-between">
		<h5 class="text-lg font-semibold text-gray-900 dark:text-white">{title}</h5>
		<button
			onclick={close}
			aria-label="Close"
			class="rounded-lg p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
		>
			<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
				<path
					fill-rule="evenodd"
					d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
	</div>
	<div class="mt-6 min-h-0 flex-1 overflow-hidden">
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>
