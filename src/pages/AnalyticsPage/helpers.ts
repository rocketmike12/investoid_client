import type { Operation } from "../../store/types";
import { toMajor } from "../../utils/money";

export type AnalyticsData = {
	key: string;
	sum: number;
	expenses: number;
	profits: number;
	categories: Record<
		string,
		{
			sum: number;
			subcategories: Record<string, number>;
		}
	>;
};

export const getMonthList = function (operations: Operation[]): string[] {
	const months: string[] = [];

	for (const operation of operations) {
		const [, month, year] = operation.date.split(".");
		const key = `${year}-${month}`;
		months.push(key);
	}

	return months.filter((month, i) => months.indexOf(month) == i);
};

export const getAnalytics = function (operations: Operation[]): AnalyticsData[] {
	const totals: Record<
		string,
		{
			sum: number;
			expenses: number;
			profits: number;
			categories: Record<
				string,
				{
					sum: number;
					subcategories: Record<string, number>;
				}
			>;
		}
	> = {};

	for (const operation of operations) {
		const [, month, year] = operation.date.split(".");

		const key = `${year}-${month}`;

		if (totals[key]) continue;

		const expenses = operations.filter((el) => el.date.split(".")[1] === month).reduce((acc, val) => acc + (val.sum < 0 ? toMajor(val.sum) : 0), 0);
		const profits = operations.filter((el) => el.date.split(".")[1] === month).reduce((acc, val) => acc + (val.sum > 0 ? toMajor(val.sum) : 0), 0);

		const categories: Record<
			string,
			{
				sum: number;
				subcategories: Record<string, number>;
			}
		> = {};

		for (const operation of operations) {
			const key = operation.category.toLowerCase();
			if (categories[key]) continue;

			let sum = 0;

			const subcategories: Record<string, number> = {};

			for (const operation of operations) {
				const key = operation.subcategory;

				if (subcategories[key]) {
					subcategories[key] += toMajor(operation.sum);
				} else {
					subcategories[key] == toMajor(operation.sum);
				}

				sum += toMajor(operation.sum);
			}
		}

		totals[key] ??= {
			sum: expenses + profits,
			expenses,
			profits,
			categories
		};
	}

	return Object.entries(totals)
		.map(([key, total]) => ({ key, sum: total.sum, expenses: total.expenses, profits: total.profits, categories: total.categories }))
		.sort((a, b) => b.key.localeCompare(a.key));
};

export const formatMonthKey = function (key: string) {
	const [year, month] = key.split("-").map(Number);

	return new Date(year, month - 1)
		.toLocaleString("en-US", {
			month: "long",
			year: "numeric"
		})
		.toLowerCase();
};
