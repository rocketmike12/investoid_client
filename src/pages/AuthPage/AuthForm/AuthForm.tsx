import { useState, type SubmitEventHandler } from "react";

import { useAuthStore } from "../../../store/authStore";

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
			<form onSubmit={handleSubmit}>
				<label htmlFor="email">Email:</label>
				<input type="email" name="email" />
				<label htmlFor="password">Password:</label>
				<input type="password" name="password" />
				<button
					type="submit"
					onClick={() => {
						setAuthRole("login");
					}}
				>
					LOG IN
				</button>
				<button
					type="submit"
					onClick={() => {
						setAuthRole("register");
					}}
				>
					SIGN UP
				</button>
			</form>
		</>
	);
};
