import type { KeyboardEventHandler, SubmitEventHandler } from "react";

import { useState } from "react";

import { FaRegCalendarAlt } from "react-icons/fa";

import { useAuthStore } from "../../../store/authStore";

import { Input } from "./Input";

import { FORM_DATA_INIT, type FormData, formatDateInput, isFormDirty, validateDate, validateSum, validateForm } from "./helpers";

import styles from "./AddOperation.module.scss";

export const AddOperation = () => {
	const addOperation = useAuthStore((state) => state.addOperation);

	const [formData, setFormData] = useState<FormData>(FORM_DATA_INIT);
	const [showErrors, setShowErrors] = useState(false);

	const isDirty = isFormDirty(formData);

	const shouldHighlight = showErrors && isDirty;

	const updateField = (field: keyof FormData) => (value: string) => {
		setFormData((prev) => ({
			...prev,
			[field]: value
		}));

		if (!showErrors && value.trim() !== "") {
			setShowErrors(true);
		}
	};

	const handleFormBlur = () => {
		setShowErrors(isDirty);
	};

	const handleSumBlur = () => {
		if (formData.sum === "" || formData.sum === ".") {
			updateField("sum")("");
			return;
		}

		const num = Number(formData.sum);

		if (!Number.isNaN(num)) {
			updateField("sum")(num.toFixed(2));
		}
	};

	const resetState = () => {
		setFormData(FORM_DATA_INIT);
		setShowErrors(false);
	};

	const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		addOperation({
			date: formData.date,
			description: formData.description,
			category: formData.category,
			subcategory: formData.subcategory,
			sum: parseFloat(formData.sum)
		});

		const form = e.currentTarget;
		form.querySelectorAll<HTMLInputElement>("input")[0].focus();

		resetState();
	};

	const handleEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key !== "Enter") return;

		const form = e.currentTarget.form;
		if (!form) return;

		const inputs = Array.from(form.querySelectorAll<HTMLInputElement>("input")).filter((el) => !el.disabled && el.type !== "hidden");

		const currentIndex = inputs.indexOf(e.currentTarget);
		if (currentIndex === -1) return;

		const isFilled = (el: HTMLInputElement) => el.value.trim().length > 0;

		let nextIndex = -1;

		for (let i = 1; i <= inputs.length; i++) {
			const idx = (currentIndex + i) % inputs.length;
			if (!isFilled(inputs[idx])) {
				nextIndex = idx;
				break;
			}
		}

		e.preventDefault();

		if (nextIndex === -1) {
			form.requestSubmit();
			return;
		}

		inputs[nextIndex].focus();
	};

	return (
		<form onSubmit={handleSubmit} onBlur={handleFormBlur} className={styles["operation-form"]}>
			<FaRegCalendarAlt className={styles["operation-form__calendar"]} />

			<Input
				type="text"
				name="date"
				className={styles["operation-form__date-input"]}
				placeholder="DD.MM.YYYY"
				value={formData.date}
				onChange={(e) => updateField("date")(formatDateInput(e.target.value))}
				onKeyDown={handleEnter}
				error={shouldHighlight && !validateDate(formData.date)}
				errorClassName={styles["operation-form__date-input--error"]}
			/>

			<div className={styles["operation-form__input-wrap"]}>
				<Input
					type="text"
					name="description"
					className={styles["operation-form__input"]}
					placeholder="description"
					value={formData.description}
					onChange={(e) => updateField("description")(e.target.value)}
					onKeyDown={handleEnter}
					error={shouldHighlight && !formData.description.trim()}
					errorClassName={styles["operation-form__input--error"]}
				/>

				<Input
					type="text"
					name="category"
					className={styles["operation-form__input"]}
					placeholder="category"
					value={formData.category}
					onChange={(e) => updateField("category")(e.target.value)}
					onKeyDown={handleEnter}
					error={shouldHighlight && !formData.category.trim()}
					errorClassName={styles["operation-form__input--error"]}
				/>

				<Input
					type="text"
					name="subcategory"
					className={styles["operation-form__input"]}
					placeholder="subcategory"
					value={formData.subcategory}
					onChange={(e) => updateField("subcategory")(e.target.value)}
					onKeyDown={handleEnter}
					error={shouldHighlight && !formData.subcategory.trim()}
					errorClassName={styles["operation-form__input--error"]}
				/>

				<Input
					type="text"
					inputMode="decimal"
					name="sum"
					className={styles["operation-form__input"]}
					placeholder="±00.00"
					value={formData.sum}
					onChange={(e) => {
						const next = e.target.value;

						if (next === "" || next === "-" || next == "+" || validateSum(next)) {
							updateField("sum")(next);
						}
					}}
					onKeyDown={handleEnter}
					onBlur={handleSumBlur}
					error={shouldHighlight && !formData.sum.trim()}
					errorClassName={styles["operation-form__input--error"]}
				/>
			</div>

			<button type="submit" disabled={!validateForm(formData)} className={styles["operation-form__submit"]}>
				Add
			</button>

			<button type="reset" onClick={resetState} className={styles["operation-form__reset"]}>
				Clear
			</button>
		</form>
	);
};
