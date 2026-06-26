import { useEffect, useState, type SubmitEventHandler } from "react";

import { useAuthStore } from "../../../store/authStore";
import { confirm } from "../../../store/helpers";

import { toMajor } from "../../../utils/money";

import styles from "./Balance.module.scss";

export const Balance = function () {
	const balance = useAuthStore((state) => state.balance);
	const setBalance = useAuthStore((state) => state.setBalance);

	const [value, setValue] = useState(toMajor(balance).toFixed(2));

	useEffect(() => {
		setValue(toMajor(balance).toFixed(2));
	}, [balance]);

	const validateBalance = (value: string): boolean => /^[+-]{0,1}\d*(\.\d{0,2})?$/.test(value);

	const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();

		const form = e.currentTarget as typeof e.currentTarget & {
			balance: { value: string };
		};

		if (e.target.value === "") {
			setValue("0.00");
		}

		setValue(Number.parseFloat(value).toFixed(2));

		const ok = await confirm("This will erase all current records. Are you sure?");
		if (!ok) {
			setValue(toMajor(balance).toFixed(2));
			return;
		}

		const parsedBalance = form.balance.value;

		setBalance(Number.parseFloat(parsedBalance));

		form.reset();
	};

	return (
		<>
			<div className={styles["balance"]}>
				<span className={styles["balance__label"]}>Balance:</span>
				<form onSubmit={handleSubmit} className={styles["balance__form"]}>
					<input
						type="text"
						name="balance"
						className={styles["balance__balance"]}
						value={value}
						onChange={(e) => {
							const next = e.target.value;

							console.log(next);
							console.log(validateBalance(next));

							if (next === "" || validateBalance(next)) {
								setValue(next);
							}
						}}
						onBlur={(e) => {
							if (e.target.value === "") {
								setValue("0.00");
								return;
							}

							setValue(Number.parseFloat(value).toFixed(2));
						}}
					/>
					<button type="submit" className={styles["balance__confirm"]}>
						Confirm
					</button>
				</form>
			</div>
		</>
	);
};
