import { useEffect } from "react";

import { useAuthStore } from "./store/authStore";

import { Routes, Route } from "react-router";

import { Loader } from "./components/Loader/Loader";

import { AuthPage } from "./pages/AuthPage/AuthPage";
import { MainPage } from "./pages/MainPage/MainPage";
import { AnalyticsPage } from "./pages/AnalyticsPage/AnalyticsPage";

import "./App.scss";
import "./sass/base/base.scss";

export const App = function () {
	const stateIsLogin = useAuthStore((state) => state.isLogin);
	const session = useAuthStore((state) => state.session);

	useEffect(() => {
		session();
	}, []);

	return (
		<>
			<Loader />
			<Routes>
				<Route path="/" element={stateIsLogin ? <MainPage /> : <AuthPage />} />
				<Route path="/analytics" element={<AnalyticsPage />} />
			</Routes>
		</>
	);
};
