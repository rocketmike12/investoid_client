import { useState, useEffect } from "react";

import type { Operation } from "../../store/types";
import { toMajor } from "../../utils/money";

export type AnalyticsData = {
	key: string;
	sum: number;
	expenses: number;
	incomes: number;
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
	const totals: Record<string, AnalyticsData> = {};

	for (const op of operations) {
		const [, month, year] = op.date.split(".");
		const key = `${year}-${month}`;

		if (!totals[key]) {
			totals[key] = {
				key,
				sum: 0,
				expenses: 0,
				incomes: 0,
				categories: {}
			};
		}

		const major = toMajor(op.sum);

		totals[key].sum += major;

		if (op.sum < 0) {
			totals[key].expenses += major;
		} else {
			totals[key].incomes += major;
		}

		const catKey = op.category.toLowerCase();

		if (!totals[key].categories[catKey]) {
			totals[key].categories[catKey] = {
				sum: 0,
				subcategories: {}
			};
		}

		totals[key].categories[catKey].sum += major;

		const subKey = op.subcategory;

		if (!totals[key].categories[catKey].subcategories[subKey]) {
			totals[key].categories[catKey].subcategories[subKey] = 0;
		}

		totals[key].categories[catKey].subcategories[subKey] += major;
	}

	return Object.values(totals).sort((a, b) => a.key.localeCompare(b.key));
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

function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height
	};
}

export const useWindowDimensions = function () {
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowDimensions;
};
