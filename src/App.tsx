import { useEffect } from "react";

import { useAuthStore } from "./store/authStore";

import { Routes, Route } from "react-router";

import { AuthPage } from "./pages/AuthPage/AuthPage";
import { MainPage } from "./pages/MainPage/MainPage";

import "./App.module.scss";
import "./sass/base/base.scss";

export const App = function () {
	const stateIsLogin = useAuthStore((state) => state.isLogin);
	const session = useAuthStore((state) => state.session);

	useEffect(() => {
		session();
	}, []);

	return (
		<>
			<Routes>
				<Route path="/" element={stateIsLogin ? <MainPage /> : <AuthPage />} />
			</Routes>
		</>
	);
};
