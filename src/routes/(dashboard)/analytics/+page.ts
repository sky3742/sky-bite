export function load() {
	return {
		weeklySales: [
			{
				name: 'Weekly Sales',
				data: [
					{ x: 'Sun', y: 111 },
					{ x: 'Mon', y: 231 },
					{ x: 'Tue', y: 122 },
					{ x: 'Wed', y: 63 },
					{ x: 'Thu', y: 421 },
					{ x: 'Fri', y: 122 },
					{ x: 'Sat', y: 323 }
				]
			}
		],
		weeklyOrders: [
			{
				name: 'Orders',
				data: [
					{ x: 'Sun', y: 111 },
					{ x: 'Mon', y: 231 },
					{ x: 'Tue', y: 122 },
					{ x: 'Wed', y: 63 },
					{ x: 'Thu', y: 421 },
					{ x: 'Fri', y: 122 },
					{ x: 'Sat', y: 323 }
				]
			}
		],
		monthlySales: {
			series: [
				{
					name: 'Sales',
					data: [6500, 6418, 6456, 6526, 6356, 6456, 6500, 6418, 6456, 6526, 6356, 6456]
				}
			],
			categories: [
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
			]
		},
		monthlyOrder: {
			series: [
				{
					name: 'Sales',
					data: [6500, 6418, 6456, 6526, 6356, 6456, 6500, 6418, 6456, 6526, 6356, 6456]
				}
			],
			categories: [
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
			]
		},
		categorySales: {
			labels: ['Direct', 'Organic search', 'Referrals'],
			series: [52.8, 26.8, 20.4]
		},
		topItemsOrder: [
			{
				name: 'Top Items Order',
				data: [
					{ x: 'Item 1', y: 111 },
					{ x: 'Item 2', y: 231 },
					{ x: 'Item 3', y: 122 },
					{ x: 'Item 4', y: 63 },
					{ x: 'Item 5', y: 421 },
					{ x: 'Others', y: 421 }
				]
			}
		]
	};
}
