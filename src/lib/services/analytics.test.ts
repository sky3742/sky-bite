import { describe, it, expect } from 'vitest';
import {
	getWeeklySales,
	getWeeklyOrders,
	getMonthlySales,
	getMonthlyOrders,
	getCategorySales,
	getTopItems
} from './analytics';

describe('analytics service', () => {
	describe('getWeeklySales', () => {
		it('returns correct structure', () => {
			const result = getWeeklySales();
			expect(result).toHaveLength(1);
			expect(result[0].name).toBe('Weekly Sales');
			expect(result[0].data).toHaveLength(7);
		});

		it('each day has x (string) and y (number) values', () => {
			const result = getWeeklySales();
			const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
			result[0].data.forEach((point, i) => {
				expect(point.x).toBe(days[i]);
				expect(typeof point.y).toBe('number');
				expect(point.y).toBeGreaterThanOrEqual(0);
			});
		});
	});

	describe('getWeeklyOrders', () => {
		it('returns correct structure', () => {
			const result = getWeeklyOrders();
			expect(result).toHaveLength(1);
			expect(result[0].name).toBe('Orders');
			expect(result[0].data).toHaveLength(7);
		});

		it('each entry has string x and number y', () => {
			const result = getWeeklyOrders();
			result[0].data.forEach((point) => {
				expect(typeof point.x).toBe('string');
				expect(typeof point.y).toBe('number');
				expect(point.y).toBeGreaterThanOrEqual(0);
			});
		});
	});

	describe('getMonthlySales', () => {
		it('returns correct structure', () => {
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
			const result = getMonthlySales();
			expect(result.series).toHaveLength(1);
			expect(result.series[0].name).toBe('Sales');
			expect(result.series[0].data).toHaveLength(12);
			expect(result.categories).toEqual(months);
		});

		it('all sales values are non-negative numbers', () => {
			const result = getMonthlySales();
			result.series[0].data.forEach((val) => {
				expect(typeof val).toBe('number');
				expect(val).toBeGreaterThanOrEqual(0);
			});
		});
	});

	describe('getMonthlyOrders', () => {
		it('returns correct structure', () => {
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
			const result = getMonthlyOrders();
			expect(result.series).toHaveLength(1);
			expect(result.series[0].name).toBe('Orders');
			expect(result.series[0].data).toHaveLength(12);
			expect(result.categories).toEqual(months);
		});

		it('all order counts are non-negative numbers', () => {
			const result = getMonthlyOrders();
			result.series[0].data.forEach((val) => {
				expect(typeof val).toBe('number');
				expect(val).toBeGreaterThanOrEqual(0);
			});
		});
	});

	describe('getCategorySales', () => {
		it('returns labels and series arrays of same length', () => {
			const result = getCategorySales();
			expect(result.labels.length).toBeGreaterThanOrEqual(1);
			expect(result.labels.length).toBe(result.series.length);
		});

		it('all values are valid', () => {
			const result = getCategorySales();
			result.labels.forEach((label) => {
				expect(typeof label).toBe('string');
				expect(label.length).toBeGreaterThan(0);
			});
			result.series.forEach((val) => {
				expect(typeof val).toBe('number');
				expect(val).toBeGreaterThanOrEqual(0);
			});
		});
	});

	describe('getTopItems', () => {
		it('returns at most 5 top items', () => {
			const result = getTopItems();
			expect(result).toHaveLength(1);
			expect(result[0].data.length).toBeLessThanOrEqual(5);
		});

		it('items are sorted by count descending', () => {
			const result = getTopItems();
			if (result[0].data.length > 0) {
				expect(typeof result[0].data[0].x).toBe('string');
				expect(typeof result[0].data[0].y).toBe('number');
				for (let i = 1; i < result[0].data.length; i++) {
					expect(result[0].data[i].y).toBeLessThanOrEqual(result[0].data[i - 1].y);
				}
			}
		});
	});
});
