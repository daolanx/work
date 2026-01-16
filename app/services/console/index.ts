/**
 * querySummeryCard
 * @returns
 */
export async function querySummeryCards() {
	return {
		success: true,
		data: [
			{
				id: "total-revenue",
				label: "Total Revenue",
				amount: 1250.0,
				currency: "USD",
				changePercentage: 0.125,
				period: "last 6 months",
			},
			{
				id: "new-customers",
				label: "New Customers",
				amount: 1234,
				changePercentage: -0.2,
				period: "this period",
			},
			{
				id: "active-accounts",
				label: "Active Accounts",
				amount: 45678,
				changePercentage: 0.125,
				period: "engagement targets",
			},
			{
				id: "growth-rate",
				label: "Growth Rate",
				amount: 0.045,
				changePercentage: 0.045,
				period: "growth projections",
			},
		]
	}
}


