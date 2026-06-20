import { useAuthStore } from "../../../store/authStore";

import { Summary } from "./Summary/Summary";

import { FaRegTrashAlt } from "react-icons/fa";

import styles from "./Operations.module.scss";

const MIN_ROWS = 10;

export const Operations = function () {
	const operations = useAuthStore((state) => state.operations);

	const deleleOperation = useAuthStore((state) => state.deleteOperation);

	const emptyRows = Math.max(0, MIN_ROWS - operations.length);

	return (
		<>
			<div className={styles["operations"]}>
				<table className={styles["operations-table"]}>
					<thead>
						<tr>
							<th>Date</th>
							<th>Description</th>
							<th>Category</th>
							<th>Sum</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{operations.map((el) => (
							<tr key={el._id}>
								<td className={styles["date"]}>{el.date}</td>
								<td className={styles["description"]}>{el.description}</td>
								<td className={styles["category"]}>{el.category}</td>
								<td className={styles["sum"]}>{el.sum}</td>
								<td className={styles["delete"]}>
									<button onClick={() => deleleOperation(el._id || "")} className={styles["delete__button"]}>
										<FaRegTrashAlt className={styles["delete__button__icon"]} />
									</button>
								</td>
							</tr>
						))}
						{Array.from({ length: emptyRows }).map((_, index) => (
							<tr key={`empty-${index}`} className={styles["empty-row"]}>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						))}
					</tbody>
				</table>
				<Summary />
			</div>
		</>
	);
};
