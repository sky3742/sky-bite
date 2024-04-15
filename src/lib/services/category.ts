import type { Category } from '$lib/types/category';
import { faker } from '@faker-js/faker';

export const Categories: Category[] = Array.from({ length: 3 }, () => ({
	id: faker.string.uuid(),
	name: faker.commerce.productName(),
	description: faker.commerce.productDescription(),
	isActive: faker.datatype.boolean(0.8)
}));
