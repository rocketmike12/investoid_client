import { DebugOverlay } from "./components/DebugOverlay";

import { useEffect } from "react";

import { useAuthStore } from "./store/authStore";
import { userApi } from "./apis/userApi";

import { Routes, Route } from "react-router";

import { AuthPage } from "./pages/AuthPage/AuthPage";
import { MainPage } from "./pages/MainPage/MainPage";

export const App = function () {
	const stateIsLogin = useAuthStore((state) => state.isLogin);
	const stateLogin = useAuthStore((state) => state.login);
	const stateSetOperations = useAuthStore((state) => state.setOperations);

	const getSession = async function () {
		try {
			const { data } = await userApi.post("/session", "", { withCredentials: true });
			console.log(data);
			stateLogin(data.email);
			stateSetOperations(data.operations);
		} catch (err: any) {
			if (err.status === 401) {
				// setIsLoginLoading(false);
				return;
			}

			console.error(err);
		}

		// setIsLoginLoading(false);
	};

	useEffect(() => {
		getSession();
	}, []);

	return (
		<>
			<DebugOverlay />

			<Routes>
				<Route path="/" element={stateIsLogin ? <MainPage /> : <AuthPage />} />
			</Routes>
		</>
	);
};
