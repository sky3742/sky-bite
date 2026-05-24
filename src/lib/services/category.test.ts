import { describe, it, expect } from 'vitest';
import {
	getCategories,
	createCategory,
	updateCategory,
	deleteCategory,
	toggleCategoryActive
} from './category';

describe('category service', () => {
	const initialLength = getCategories().length;

	it('getCategories returns initial categories', () => {
		const cats = getCategories();
		expect(cats.length).toBeGreaterThan(0);
		expect(cats[0]).toHaveProperty('id');
		expect(cats[0]).toHaveProperty('name');
		expect(cats[0]).toHaveProperty('description');
	});

	it('createCategory adds a new category', () => {
		const data = { name: 'Test Category', description: 'A test' };
		const created = createCategory(data);
		expect(created.id).toBeTruthy();
		expect(created.name).toBe('Test Category');
		expect(created.description).toBe('A test');

		const all = getCategories();
		expect(all.length).toBe(initialLength + 1);
		expect(all.find((c) => c.id === created.id)).toBeTruthy();
	});

	it('updateCategory modifies an existing category', () => {
		const all = getCategories();
		const target = all[0];
		updateCategory({
			...target,
			name: 'Updated Name',
			description: 'Updated desc'
		});
		const fetched = getCategories().find((c) => c.id === target.id);
		expect(fetched?.name).toBe('Updated Name');
		expect(fetched?.description).toBe('Updated desc');
	});

	it('deleteCategory removes a category', () => {
		const before = getCategories().length;
		const target = getCategories()[0];
		deleteCategory(target.id);
		const after = getCategories().length;
		expect(after).toBe(before - 1);
		expect(getCategories().find((c) => c.id === target.id)).toBeUndefined();
	});

	it('toggleCategoryActive toggles isActive', () => {
		const all = getCategories();
		const target = all[0];
		const wasActive = target.isActive;

		toggleCategoryActive(target.id);
		const afterToggle = getCategories().find((c) => c.id === target.id);
		expect(afterToggle?.isActive).toBe(!wasActive);

		toggleCategoryActive(target.id);
		const afterSecondToggle = getCategories().find((c) => c.id === target.id);
		expect(afterSecondToggle?.isActive).toBe(wasActive);
	});

	it('toggleCategoryActive sets isActive from undefined to true', () => {
		const newCat = createCategory({ name: 'No active', description: 'desc' });
		expect(newCat.isActive).toBeUndefined();

		toggleCategoryActive(newCat.id);
		const fetched = getCategories().find((c) => c.id === newCat.id);
		expect(fetched?.isActive).toBe(true);
	});
});
