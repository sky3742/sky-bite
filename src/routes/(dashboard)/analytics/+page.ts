import {
	getWeeklySales,
	getWeeklyOrders,
	getMonthlySales,
	getMonthlyOrders,
	getCategorySales,
	getTopItems
} from '$lib/services/analytics';

export function load() {
	return {
		weeklySales: getWeeklySales(),
		weeklyOrders: getWeeklyOrders(),
		monthlySales: getMonthlySales(),
		monthlyOrder: getMonthlyOrders(),
		categorySales: getCategorySales(),
		topItemsOrder: getTopItems()
	};
}
