import { OrderStatus } from '$lib/types/order';
import { getOrders } from './order';
import { getFood } from './menu';
import { getCategories } from './category';

function startOfWeek(date: Date): Date {
	const d = new Date(date);
	const day = d.getDay();
	d.setDate(d.getDate() - day);
	d.setHours(0, 0, 0, 0);
	return d;
}

export function getWeeklySales(): { name: string; data: { x: string; y: number }[] }[] {
	const weekStart = startOfWeek(new Date());
	const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	const dayTotals = days.map((_, i) => {
		const day = new Date(weekStart);
		day.setDate(day.getDate() + i);
		const dayEnd = new Date(day);
		dayEnd.setHours(23, 59, 59, 999);

		const total = getOrders()
			.filter((o) => o.status === OrderStatus.COMPLETED)
			.filter((o) => {
				const d = new Date(o.date);
				return d >= day && d <= dayEnd;
			})
			.reduce((sum, o) => sum + o.amount, 0);

		return { x: days[i], y: total };
	});

	return [{ name: 'Weekly Sales', data: dayTotals }];
}

export function getWeeklyOrders(): { name: string; data: { x: string; y: number }[] }[] {
	const weekStart = startOfWeek(new Date());
	const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	const dayTotals = days.map((_, i) => {
		const day = new Date(weekStart);
		day.setDate(day.getDate() + i);
		const dayEnd = new Date(day);
		dayEnd.setHours(23, 59, 59, 999);

		const count = getOrders().filter((o) => {
			const d = new Date(o.date);
			return d >= day && d <= dayEnd;
		}).length;

		return { x: days[i], y: count };
	});

	return [{ name: 'Orders', data: dayTotals }];
}

export function getMonthlySales(): {
	series: { name: string; data: number[] }[];
	categories: string[];
} {
	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];
	const now = new Date();
	const year = now.getFullYear();

	const data = months.map((_, i) => {
		const monthStart = new Date(year, i, 1);
		const monthEnd = new Date(year, i + 1, 0, 23, 59, 59, 999);

		return getOrders()
			.filter((o) => o.status === OrderStatus.COMPLETED)
			.filter((o) => {
				const d = new Date(o.date);
				return d >= monthStart && d <= monthEnd;
			})
			.reduce((sum, o) => sum + o.amount, 0);
	});

	return { series: [{ name: 'Sales', data }], categories: months };
}

export function getMonthlyOrders(): {
	series: { name: string; data: number[] }[];
	categories: string[];
} {
	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];
	const now = new Date();
	const year = now.getFullYear();

	const data = months.map((_, i) => {
		const monthStart = new Date(year, i, 1);
		const monthEnd = new Date(year, i + 1, 0, 23, 59, 59, 999);

		return getOrders().filter((o) => {
			const d = new Date(o.date);
			return d >= monthStart && d <= monthEnd;
		}).length;
	});

	return { series: [{ name: 'Orders', data }], categories: months };
}

export function getCategorySales(): { labels: string[]; series: number[] } {
	const categories = getCategories();
	const food = getFood();

	const labels: string[] = [];
	const series: number[] = [];

	for (const cat of categories) {
		const total = food.filter((m) => m.categoryId === cat.id).reduce((sum, m) => sum + m.price, 0);

		labels.push(cat.name);
		series.push(Number(total.toFixed(2)));
	}

	return { labels, series };
}

export function getTopItems(): { name: string; data: { x: string; y: number }[] }[] {
	const itemCount = new Map<string, number>();

	for (const order of getOrders()) {
		for (const item of order.items) {
			itemCount.set(item.name, (itemCount.get(item.name) ?? 0) + 1);
		}
	}

	const sorted = [...itemCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);

	const data = sorted.map(([name, count]) => ({ x: name, y: count }));

	return [{ name: 'Top Items', data }];
}
