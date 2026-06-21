import type { Operation } from "../../../store/types.ts";

export const parseDate = function (dateStr: string) {
	const [day, month, year] = dateStr.split(".").map(Number);

	const date = new Date(year, month - 1, day);

	const valid = date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;

	return valid ? date.getTime() : 0;
};

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
