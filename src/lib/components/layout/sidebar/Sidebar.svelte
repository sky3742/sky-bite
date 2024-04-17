<script lang="ts">
	import { page } from '$app/stores';
	import { LanguageSelector } from '$lib/components/common';
	import { SideMenu } from '$lib/constants/SideMenu';
	import {
		Button,
		DarkMode,
		Sidebar,
		SidebarDropdownItem,
		SidebarDropdownWrapper,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper
	} from 'flowbite-svelte';
	import { AdjustmentsVerticalSolid, CogSolid } from 'flowbite-svelte-icons';
	import { NavBrand } from '..';

	$: activeUrl = $page.url.pathname;
</script>

<Sidebar
	class="hidden h-screen border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 md:inline-block"
	{activeUrl}
>
	<SidebarWrapper class="bg-white">
		<div class="flex items-center justify-start gap-2 pb-9 pt-2">
			<NavBrand />
		</div>

		{#each SideMenu as menu, i}
			<SidebarGroup border={i !== 0}>
				{#each menu as item}
					<li>
						{#if item.submenu}
							<SidebarDropdownWrapper label={item.label}>
								<svelte:component
									this={item.icon}
									slot="icon"
									aria-hidden="true"
									class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
								/>

								{#each item.submenu as submenu}
									<SidebarDropdownItem label={submenu.label} href={submenu.href} />
								{/each}
							</SidebarDropdownWrapper>
						{:else}
							<SidebarItem href={item.href} label={item.label}>
								<svelte:component
									this={item.icon}
									slot="icon"
									aria-hidden="true"
									class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
								/>
							</SidebarItem>
						{/if}
					</li>
				{/each}
			</SidebarGroup>
		{/each}

		<div
			class="absolute bottom-0 -left-1 z-20 hidden w-full justify-center space-x-4 bg-white p-4 dark:bg-gray-800 lg:flex"
		>
			<DarkMode />

			<Button href="/#" color="alternative" class="border-none p-2">
				<AdjustmentsVerticalSolid aria-hidden="true" class="h-6 w-6" />
			</Button>

			<Button href="/#" color="alternative" class="border-none p-2">
				<CogSolid aria-hidden="true" class="h-6 w-6" />
			</Button>

			<LanguageSelector />
		</div>
	</SidebarWrapper>
</Sidebar>
