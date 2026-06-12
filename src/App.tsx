import { DebugOverlay } from "./components/DebugOverlay";

import { useEffect } from "react";

import { useAuthStore } from "./store/authStore";
import { userApi } from "./apis/userApi";

import { Routes, Route } from "react-router";

import { AuthPage } from "./pages/AuthPage/AuthPage";
import { MainPage } from "./pages/MainPage/MainPage";

export const App = function () {
	const stateIsLogin = useAuthStore((state) => state.isLogin);
	const session = useAuthStore((state) => state.session);

	useEffect(() => {
		session();
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
