<script lang="ts">
	import { page } from '$app/stores';
	import { ThemeToggle } from '$lib/components/common';
	import { SideMenu } from '$lib/constants/side-menu';
	import { NavBrand } from '..';
</script>

<aside
	class="hidden h-screen border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 md:inline-block"
>
	<div class="flex h-full flex-col bg-white dark:bg-gray-800">
		<div class="flex items-center gap-2 px-6 pb-9 pt-2">
			<NavBrand />
		</div>

		<nav class="flex-1 overflow-y-auto px-3">
			{#each SideMenu as section, i (i)}
				<ul
					class="space-y-1 {i !== 0
						? 'mt-4 border-t border-gray-200 pt-4 dark:border-gray-700'
						: ''}"
				>
					{#each section as item (item.label)}
						<li>
							{#if item.submenu}
								<details class="group">
									<summary
										class="flex cursor-pointer items-center rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
									>
										<svelte:component
											this={item.icon}
											aria-hidden="true"
											class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
										/>
										<span class="ms-3 flex-1 whitespace-nowrap text-left text-sm font-medium"
											>{item.label}</span
										>
										<svg
											class="h-4 w-4 transition group-open:rotate-180"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											><path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M19 9l-7 7-7-7"
											/></svg
										>
									</summary>
									<ul class="mt-1 space-y-1 px-4">
										{#each item.submenu as sub (sub.label)}
											<li>
												<a
													href={sub.href}
													class="block rounded-lg px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
													class:bg-gray-100={$page.url.pathname === sub.href}
													class:text-primary-700={$page.url.pathname === sub.href}
												>
													{sub.label}
												</a>
											</li>
										{/each}
									</ul>
								</details>
							{:else}
								<a
									href={item.href}
									class="flex items-center rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
									class:bg-gray-100={$page.url.pathname === item.href}
									class:text-primary-700={$page.url.pathname === item.href}
								>
									<svelte:component
										this={item.icon}
										aria-hidden="true"
										class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
									/>
									<span class="ms-3 whitespace-nowrap text-sm font-medium">{item.label}</span>
								</a>
							{/if}
						</li>
					{/each}
				</ul>
			{/each}
		</nav>

		<div class="flex items-center justify-center border-t border-gray-200 p-4 dark:border-gray-700">
			<ThemeToggle />
		</div>
	</div>
</aside>
