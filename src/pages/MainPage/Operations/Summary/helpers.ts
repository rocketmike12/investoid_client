import type { Operation } from "../../../../store/types.ts";

export type MonthlySummary = {
	key: string;
	total: number;
};

export const getMonthlySummary = function (operations: Operation[]): MonthlySummary[] {
	const totals: Record<string, number> = {};

	for (const operation of operations) {
		const [, month, year] = operation.date.split(".");

		const key = `${year}-${month}`;

		totals[key] ??= 0;
		totals[key] += operation.sum;
	}

	return Object.entries(totals)
		.map(([key, total]) => ({ key, total }))
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
