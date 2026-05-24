<script lang="ts">
	import { goto } from '$app/navigation';

	let open = $state(false);

	function toggle(e: MouseEvent) {
		e.stopPropagation();
		open = !open;
	}

	function handleClickOutside() {
		open = false;
	}

	function stopProp(e: Event) {
		e.stopPropagation();
	}

	function signOut() {
		localStorage.removeItem('sb-auth');
		goto('/login');
	}
</script>

<svelte:window onclick={handleClickOutside} />

<div class="relative">
	<button
		id="user-menu-button"
		onclick={toggle}
		class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
	>
		<span class="sr-only">Open user menu</span>
		<img
			src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
			alt="User avatar"
			class="h-8 w-8 rounded-full"
		/>
	</button>

	{#if open}
		<div
			class="absolute right-0 z-50 mt-2 w-56 divide-y divide-gray-100 rounded-xl bg-white text-base shadow-lg ring-1 ring-black/5 dark:divide-gray-600 dark:bg-gray-700"
			onclick={stopProp}
			onkeydown={stopProp}
			role="presentation"
		>
			<div class="px-4 py-3">
				<p class="text-sm font-semibold text-gray-900 dark:text-white">Neil Sims</p>
				<p class="truncate text-sm text-gray-500 dark:text-gray-400">name@flowbite.com</p>
			</div>
			<ul class="py-1 text-gray-700 dark:text-gray-300">
				<li>
					<a
						href="/#"
						class="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>My profile</a
					>
				</li>
				<li>
					<a
						href="/#"
						class="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>Account settings</a
					>
				</li>
			</ul>
			<ul class="py-1 text-gray-700 dark:text-gray-300">
				<li>
					<button
						onclick={signOut}
						class="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
					>
						Sign out
					</button>
				</li>
			</ul>
		</div>
	{/if}
</div>
