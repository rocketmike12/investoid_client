import type { SubmitEventHandler } from "react";

import { useAuthStore } from "../../../store/authStore";

export const AddOperation = function () {
	const addOperation = useAuthStore((state) => state.addOperation);

	const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		const form = e.currentTarget as typeof e.currentTarget & {
			date: { value: string };
			description: { value: string };
			category: { value: string };
			subcategory: { value: string };
			sum: { value: string };
		};

		const date = form.date.value;
		const description = form.description.value;
		const category = form.category.value;
		const subcategory = form.subcategory.value;
		const sum = form.sum.value;

		addOperation({ date: new Date(Date.parse(date)), description, category, subcategory, sum: parseFloat(sum) });

		form.reset();
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label htmlFor="date">Date:</label>
				<input type="text" name="date" />

				<label htmlFor="description">Description:</label>
				<input type="text" name="description" />

				<label htmlFor="category">Category:</label>
				<input type="text" name="category" />

				<label htmlFor="subcategory">Subcategory:</label>
				<input type="text" name="subcategory" />

				<label htmlFor="sum">Sum:</label>
				<input type="text" name="sum" />

				<button type="submit">Add</button>
			</form>
		</>
	);
};
