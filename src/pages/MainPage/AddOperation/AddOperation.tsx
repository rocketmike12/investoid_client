import type { SubmitEventHandler } from "react";

import { useEffect, useState } from "react";

import { useAuthStore } from "../../../store/authStore";

import { Input } from "./Input";

import styles from "./AddOperation.module.scss";

export const AddOperation = function () {
	const addOperation = useAuthStore((state) => state.addOperation);

	const dateValidation = function (string: string): boolean {
		return /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d+/.test(string);
	};

	const [formData, setFormData] = useState({
		date: "",
		description: "",
		category: "",
		subcategory: "",
		sum: ""
	});
	const [isValid, setIsValid] = useState(false);

	useEffect(() => {
		setIsValid(dateValidation(formData.date) && formData.description.length > 0 && formData.category.length > 0 && formData.subcategory.length > 0 && formData.sum.length > 0);
		console.log(isValid);
	}, [formData]);

	const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		const form = e.currentTarget;

		addOperation({ date: formData.date, description: formData.description, category: formData.category, subcategory: formData.subcategory, sum: parseFloat(formData.sum) });

		form.reset();
		setFormData({
			date: "",
			description: "",
			category: "",
			subcategory: "",
			sum: ""
		});
	};

	return (
		<>
			<form onSubmit={handleSubmit} className={styles["operation-form"]}>
				<label htmlFor="date" className={styles["operation-form__label"]}>
					Date:
				</label>
				<Input
					type="text"
					name="date"
					className={styles["operation-form__input"]}
					placeholder="DD.MM.YYYY"
					onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
					error={!dateValidation(formData.date)}
					errorClassName={styles["operation-form__input--error"]}
				/>

				<label htmlFor="description" className={styles["operation-form__label"]}>
					Description:
				</label>
				<Input
					type="text"
					name="description"
					className={styles["operation-form__input"]}
					onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
					error={formData.description.length == 0}
					errorClassName={styles["operation-form__input--error"]}
				/>

				<label htmlFor="category" className={styles["operation-form__label"]}>
					Category:
				</label>
				<Input
					type="text"
					name="category"
					className={styles["operation-form__input"]}
					onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
					error={formData.category.length == 0}
					errorClassName={styles["operation-form__input--error"]}
				/>

				<label htmlFor="subcategory" className={styles["operation-form__label"]}>
					Subcategory:
				</label>
				<Input
					type="text"
					name="subcategory"
					className={styles["operation-form__input"]}
					onChange={(e) => setFormData((prev) => ({ ...prev, subcategory: e.target.value }))}
					error={formData.subcategory.length == 0}
					errorClassName={styles["operation-form__input--error"]}
				/>

				<label htmlFor="sum" className={styles["operation-form__label"]}>
					Sum:
				</label>
				<Input
					type="text"
					name="sum"
					className={styles["operation-form__input"]}
					onChange={(e) => setFormData((prev) => ({ ...prev, sum: e.target.value }))}
					error={formData.sum.length == 0}
					errorClassName={styles["operation-form__input--error"]}
				/>

				<button type="submit" disabled={!isValid}>
					Add
				</button>
			</form>
		</>
	);
};
