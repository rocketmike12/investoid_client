import { useAuthStore } from "../../../../store/authStore";

import { getMonthlySummary, formatMonthKey } from "../helpers";

import styles from "../Operations.module.scss";

const MIN_ROWS = 9;

export function Summary() {
	const operations = useAuthStore((state) => state.operations);
	const summary = getMonthlySummary(operations);

	const emptyRows = Math.max(0, MIN_ROWS - Object.keys(summary).length);

	return (
		<>
			<div className={styles["summary"]}>
				<div className={styles["scroll-wrap"]}>
					<h3 className={styles["summary__title"]}>Summary</h3>
					<ul className={styles["summary__list"]}>
						{summary.map(({ key, total }) => (
							<li key={key} className={styles["summary__item"]}>
								<span className={styles["summary__key"]}>{formatMonthKey(key)}: </span>
								<span className={styles["summary__value"]}>{total.toFixed(2)}</span>
							</li>
						))}

						{Array.from({ length: emptyRows }).map((_, i) => (
							<li key={i} className={styles["summary__item"]}></li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}
