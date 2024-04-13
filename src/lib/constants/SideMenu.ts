import {
	CartSolid,
	ChartOutline,
	ClipboardSolid,
	HomeSolid,
	UsersSolid
} from 'flowbite-svelte-icons';
import type {
	LayersSolidEvents,
	LayersSolidProps,
	LayersSolidSlots
} from 'flowbite-svelte-icons/LayersSolid.svelte';
import type { SvelteComponent } from 'svelte';

export interface MenuItem {
	label: string;
	icon?: typeof SvelteComponent<LayersSolidProps, LayersSolidEvents, LayersSolidSlots>;
	href?: string;
	submenu?: MenuItem[];
}

const firstSection: MenuItem[] = [
	{
		label: 'Home',
		icon: HomeSolid,
		href: '/'
	},
	{
		label: 'Orders',
		icon: CartSolid,
		href: '/orders'
	},
	{
		label: 'Menu',
		icon: ClipboardSolid,
		href: '/menu'
	},
	{
		label: 'Customers',
		icon: UsersSolid,
		href: '/customers'
	},
	{
		label: 'Analytics',
		icon: ChartOutline,
		href: '/analytics'
	}
];

export const SideMenu: MenuItem[][] = [firstSection];
