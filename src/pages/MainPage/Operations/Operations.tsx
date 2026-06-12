import { useAuthStore } from "../../../store/authStore";

import { Container } from "../../../components/Container/Container";

export const Operations = function () {
	const operations = useAuthStore((state) => state.operations);
	console.log(operations);

	return (
		<>
			<Container>
				<table>
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
								<th>{el.date.toLocaleString("en-GB")}</th>
								<th>{el.description}</th>
								<th>{el.category}</th>
								<th>{el.sum}</th>
							</tr>
						))}
					</tbody>
				</table>
			</Container>
		</>
	);
};
