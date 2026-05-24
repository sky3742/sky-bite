import type { Menu } from '$lib/types/menu';
import { faker } from '@faker-js/faker';
import { getCategories } from './category';

let food: Menu[] = getCategories().flatMap((category) =>
	Array.from(
		{
			length: faker.number.int({ min: 1, max: 10 })
		},
		() => ({
			id: faker.string.uuid(),
			name: faker.commerce.productName(),
			description: faker.commerce.productDescription(),
			categoryId: category.id,
			image: faker.image.url(),
			price: Number(faker.number.float({ min: 5, max: 20, fractionDigits: 2 }).toFixed(2)),
			active: faker.datatype.boolean()
		})
	)
);

export function getFood(): Menu[] {
	return food;
}

export function createMenuItem(data: Omit<Menu, 'id'>): Menu {
	const item = { ...data, id: faker.string.uuid() };
	food = [...food, item];
	return item;
}

export function updateMenuItem(data: Menu): void {
	food = food.map((m) => (m.id === data.id ? data : m));
}

export function deleteMenuItem(id: string): void {
	food = food.filter((m) => m.id !== id);
}

export function toggleMenuItemActive(id: string): void {
	food = food.map((m) => (m.id === id ? { ...m, active: !m.active } : m));
}

export function getMenuByCategory(categoryId: string): Menu[] {
	return food.filter((m) => m.categoryId === categoryId);
}
