import { useState, type SubmitEventHandler } from "react";

import { useAuthStore } from "../../../store/authStore";

import { userApi } from "../../../apis/userApi";

import Swal from "sweetalert2";

export const AuthForm = function () {
	const [authRole, setAuthRole] = useState<"login" | "register">("login");

	const stateLogin = useAuthStore((state) => state.login);

	const loginUser = async function (email: string, password: string) {
		try {
			const { data } = await userApi.post("/login", { email: email, password: password }, { withCredentials: true });
			stateLogin(data.email);
			console.log(data);

			return true;
		} catch (err: any) {
			if (err.status === 401) {
				Swal.fire({
					text: "login incorrect",
					icon: "error",
					toast: true
				});
			}

			console.error(err);

			return false;
		}
	};

	const registerUser = async function (email: string, password: string) {
		try {
			const { data } = await userApi.post("/register", { email: email, password: password }, { withCredentials: true });
			stateLogin(data.email);

			return true;
		} catch (err: any) {
			if (err.status === 409) {
				Swal.fire({
					text: "this email is already in use",
					icon: "error",
					toast: true
				});
			}

			console.error(err);

			return false;
		}
	};

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
			loginUser(email, password);
		} else {
			console.log(`register: ${email} ${password}`);
			registerUser(email, password);
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
