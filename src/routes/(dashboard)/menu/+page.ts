import { Categories } from '$lib/services/category';
import { Food } from '$lib/services/menu';

export function load() {
	return {
		categories: Categories,
		menu: Food
	};
}
