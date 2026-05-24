import { describe, it, expect } from 'vitest';
import {
	getFood,
	createMenuItem,
	updateMenuItem,
	deleteMenuItem,
	toggleMenuItemActive,
	getMenuByCategory
} from './menu';
import { getCategories } from './category';
import type { Menu } from '$lib/types/menu';

describe('menu service', () => {
	const initialLength = getFood().length;

	it('getFood returns initial menu items', () => {
		const items = getFood();
		expect(items.length).toBeGreaterThan(0);
		expect(items[0]).toHaveProperty('id');
		expect(items[0]).toHaveProperty('name');
		expect(items[0]).toHaveProperty('price');
		expect(items[0]).toHaveProperty('active');
	});

	it('createMenuItem adds a new item', () => {
		const catId = getCategories()[0].id;
		const data: Omit<Menu, 'id'> = {
			name: 'Test Item',
			description: 'A test menu item',
			image: 'https://example.com/img.png',
			price: 9.99,
			active: true,
			categoryId: catId
		};
		const created = createMenuItem(data);
		expect(created.id).toBeTruthy();
		expect(created.name).toBe('Test Item');
		expect(created.price).toBe(9.99);

		const all = getFood();
		expect(all.length).toBe(initialLength + 1);
		expect(all.find((m) => m.id === created.id)).toBeTruthy();
	});

	it('updateMenuItem modifies an existing item', () => {
		const all = getFood();
		const target = all[0];
		updateMenuItem({ ...target, name: 'Updated Item', price: 15.5 });
		const fetched = getFood().find((m) => m.id === target.id);
		expect(fetched?.name).toBe('Updated Item');
		expect(fetched?.price).toBe(15.5);
	});

	it('deleteMenuItem removes an item', () => {
		const before = getFood().length;
		const target = getFood()[0];
		deleteMenuItem(target.id);
		expect(getFood().length).toBe(before - 1);
		expect(getFood().find((m) => m.id === target.id)).toBeUndefined();
	});

	it('toggleMenuItemActive toggles the active flag', () => {
		const all = getFood();
		const target = all[0];
		const wasActive = target.active;

		toggleMenuItemActive(target.id);
		expect(getFood().find((m) => m.id === target.id)?.active).toBe(!wasActive);

		toggleMenuItemActive(target.id);
		expect(getFood().find((m) => m.id === target.id)?.active).toBe(wasActive);
	});

	it('getMenuByCategory filters by categoryId', () => {
		const all = getFood();
		const catId = all[0].categoryId;
		const filtered = getMenuByCategory(catId);
		expect(filtered.length).toBeGreaterThan(0);
		filtered.forEach((item) => {
			expect(item.categoryId).toBe(catId);
		});
	});

	it('getMenuByCategory returns empty array for non-existent category', () => {
		const result = getMenuByCategory('nonexistent-category-id');
		expect(result).toEqual([]);
	});
});
