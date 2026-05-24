import { getCategories } from '$lib/services/category';
import { getFood } from '$lib/services/menu';

export function load() {
	return {
		categories: getCategories(),
		menu: getFood()
	};
}
