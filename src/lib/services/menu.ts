import type { Menu } from '$lib/types/menu';
import { faker } from '@faker-js/faker';
import { Categories } from './category';

export const Food: Menu[] = Categories.map((category) =>
	Array.from(
		{
			length: faker.number.int({
				min: 1,
				max: 10
			})
		},
		() => ({
			id: faker.string.uuid(),
			name: faker.commerce.productName(),
			description: faker.commerce.productDescription(),
			categoryId: category.id,
			image: faker.image.urlLoremFlickr({ category: 'food' }),
			price: faker.number.float({ min: 5, max: 20, fractionDigits: 2 }),
			active: faker.datatype.boolean()
		})
	)
).flat();
