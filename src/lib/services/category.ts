import type { Category } from '$lib/types/category';
import { faker } from '@faker-js/faker';

let categories: Category[] = Array.from({ length: 3 }, () => ({
	id: faker.string.uuid(),
	name: faker.commerce.productName(),
	description: faker.commerce.productDescription(),
	isActive: faker.datatype.boolean(0.8)
}));

export function getCategories(): Category[] {
	return categories;
}

export function createCategory(data: Omit<Category, 'id'>): Category {
	const category = { ...data, id: faker.string.uuid() };
	categories = [...categories, category];
	return category;
}

export function updateCategory(data: Category): void {
	categories = categories.map((c) => (c.id === data.id ? data : c));
}

export function deleteCategory(id: string): void {
	categories = categories.filter((c) => c.id !== id);
}

export function toggleCategoryActive(id: string): void {
	categories = categories.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c));
}
