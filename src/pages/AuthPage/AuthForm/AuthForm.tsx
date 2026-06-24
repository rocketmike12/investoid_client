import { useState, type SubmitEventHandler } from "react";

import { useAuthStore } from "../../../store/authStore";

import styles from "../AuthPage.module.scss";

export const AuthForm = function () {
	const [authRole, setAuthRole] = useState<"login" | "register">("login");

	const login = useAuthStore((state) => state.login);
	const register = useAuthStore((state) => state.register);

	const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		const form = e.currentTarget as typeof e.currentTarget & {
			email: { value: string };
			password: { value: string };
		};

		const email = form.email.value;
		const password = form.password.value;

		if (authRole == "login") {
			console.log(`login: ${email} ${password}`);
			login(email, password);
		} else {
			console.log(`register: ${email} ${password}`);
			register(email, password);
		}

		form.reset();
	};

	return (
		<>
			<form onSubmit={handleSubmit} className={styles["auth__form"]}>
				<label htmlFor="email" className={styles["auth__form__label"]}>
					Email:
				</label>
				<input type="email" name="email" placeholder="your@email.com" className={styles["auth__form__input"]} />
				<label htmlFor="password" className={styles["auth__form__label"]}>
					Password:
				</label>
				<input type="password" name="password" placeholder="password" className={styles["auth__form__input"]} />
				<div className={styles["auth__form__button-wrap"]}>
					<button
						type="submit"
						onClick={() => {
							setAuthRole("login");
						}}
						className={styles["auth__form__login"]}
					>
						LOG IN
					</button>
					<button
						type="submit"
						onClick={() => {
							setAuthRole("register");
						}}
						className={styles["auth__form__sign-up"]}
					>
						SIGN UP
					</button>
				</div>
			</form>
		</>
	);
};
