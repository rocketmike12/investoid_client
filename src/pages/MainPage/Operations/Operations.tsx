import { useAuthStore } from "../../../store/authStore";

import { Container } from "../../../components/Container/Container";

import styles from "./Operations.module.scss";

export const Operations = function () {
	const operations = useAuthStore((state) => state.operations);
	console.log(operations);

	return (
		<>
			<Container>
				<table className={styles["operations-table"]}>
					<thead>
						<tr>
							<th>Date</th>
							<th>Description</th>
							<th>Category</th>
							<th>Sum</th>
						</tr>
					</thead>
					<tbody>
						{operations.map((el) => (
							<tr key={el._id}>
								<td>{el.date}</td>
								<td>{el.description}</td>
								<td>{el.category}</td>
								<td>{el.sum}</td>
							</tr>
						))}
					</tbody>
				</table>
			</Container>
		</>
	);
};
