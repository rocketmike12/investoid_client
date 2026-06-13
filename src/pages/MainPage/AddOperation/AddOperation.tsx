import type { SubmitEventHandler } from "react";

import { useEffect, useState } from "react";

import { useAuthStore } from "../../../store/authStore";

import { Input } from "./Input";

import { FaRegCalendarAlt } from "react-icons/fa";

import styles from "./AddOperation.module.scss";

export const AddOperation = function () {
	const addOperation = useAuthStore((state) => state.addOperation);

	const dateValidation = (string: string): boolean => {
		return /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d+/.test(string);
	};

	const sumValidation = (string: string): boolean => {
		return /^-?\d*(\.\d{0,2})?$/.test(string);
	};

	const handleSumBlur = () => {
		if (formData.sum === "" || formData.sum === ".") {
			setFormData((prev) => ({ ...prev, sum: "" }));
			return;
		}

		const num = Number(formData.sum);

		if (!Number.isNaN(num)) {
			setFormData((prev) => ({ ...prev, sum: num.toFixed(2) }));
		}
	};

	const [formData, setFormData] = useState({
		date: "",
		description: "",
		category: "",
		subcategory: "",
		sum: ""
	});
	const [isValid, setIsValid] = useState(false);

	const resetState = () => {
		setFormData({
			date: "",
			description: "",
			category: "",
			subcategory: "",
			sum: ""
		});
	};

	useEffect(() => {
		setIsValid(dateValidation(formData.date) && formData.description.length > 0 && formData.category.length > 0 && formData.subcategory.length > 0 && sumValidation(formData.sum));
		console.log(isValid);
	}, [formData]);

	const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		const form = e.currentTarget;

		addOperation({ date: formData.date, description: formData.description, category: formData.category, subcategory: formData.subcategory, sum: parseFloat(formData.sum) });

		form.reset();
		resetState();
	};

	return (
		<>
			<form onSubmit={handleSubmit} className={styles["operation-form"]}>
				<FaRegCalendarAlt className={styles["operation-form__calendar"]} />
				<Input
					type="text"
					name="date"
					className={styles["operation-form__input"]}
					placeholder="DD.MM.YYYY"
					value={formData.date}
					onChange={(e) => {
						const digits = e.target.value.replace(/\D/g, "").slice(0, 8);

						let formatted = digits;

						if (digits.length > 2) {
							formatted = `${digits.slice(0, 2)}.${digits.slice(2)}`;
						}

						if (digits.length > 4) {
							formatted = `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4)}`;
						}

						setFormData((prev) => ({ ...prev, date: formatted }));
					}}
					error={!dateValidation(formData.date)}
					errorClassName={styles["operation-form__input--error"]}
				/>
				<div className={styles["operation-form__input-wrap"]}>
					<Input
						type="text"
						name="description"
						className={styles["operation-form__input"]}
						placeholder="description"
						onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
						error={formData.description.length == 0}
						errorClassName={styles["operation-form__input--error"]}
					/>

					<Input
						type="text"
						name="category"
						className={styles["operation-form__input"]}
						placeholder="category"
						onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
						error={formData.category.length == 0}
						errorClassName={styles["operation-form__input--error"]}
					/>

					<Input
						type="text"
						name="subcategory"
						className={styles["operation-form__input"]}
						placeholder="subcategory"
						onChange={(e) => setFormData((prev) => ({ ...prev, subcategory: e.target.value }))}
						error={formData.subcategory.length == 0}
						errorClassName={styles["operation-form__input--error"]}
					/>

					<Input
						type="text"
						inputMode="decimal"
						name="sum"
						className={styles["operation-form__input"]}
						placeholder="00.00"
						value={formData.sum}
						onChange={(e) => {
							const next = e.target.value;
							if (next === "" || next === "-" || sumValidation(next)) {
								setFormData((prev) => ({ ...prev, sum: e.target.value }));
							}
						}}
						onBlur={handleSumBlur}
						error={formData.sum.length == 0}
						errorClassName={styles["operation-form__input--error"]}
					/>
				</div>

				<button type="submit" disabled={!isValid} className={styles["operation-form__submit"]}>
					Add
				</button>

				<button type="reset" onClick={resetState} className={styles["operation-form__reset"]}>
					Clear
				</button>
			</form>
		</>
	);
};
