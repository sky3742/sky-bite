import { HomeIcon, CartIcon, ClipboardIcon, ChartIcon } from '$lib/components/common/icon';
import type { Component } from 'svelte';

export interface MenuItem {
	label: string;
	icon?: Component;
	href?: string;
	submenu?: MenuItem[];
}

const firstSection: MenuItem[] = [
	{
		label: 'Home',
		icon: HomeIcon,
		href: '/'
	},
	{
		label: 'Orders',
		icon: CartIcon,
		href: '/orders'
	},
	{
		label: 'Menu',
		icon: ClipboardIcon,
		href: '/menu'
	},
	{
		label: 'Analytics',
		icon: ChartIcon,
		href: '/analytics'
	}
];

export const SideMenu: MenuItem[][] = [firstSection];
