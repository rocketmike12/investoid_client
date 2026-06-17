import { useAuthStore } from "../../../../store/authStore";

import { getMonthlySummary, formatMonthKey } from "./helpers";

import styles from "../Operations.module.scss";

export function Summary() {
	const operations = useAuthStore((state) => state.operations);
	const summary = getMonthlySummary(operations);

	return (
		<ul className={styles["summary"]}>
			{summary.map(({ key, total }) => (
				<li key={key} className={styles["summary__item"]}>
					<span className={styles["summary__key"]}>{formatMonthKey(key)}: </span>
					<span className={styles["summary__value"]}>{total.toFixed(2)}</span>
				</li>
			))}
		</ul>
	);
}
