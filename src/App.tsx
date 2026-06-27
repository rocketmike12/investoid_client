import { useEffect } from "react";

import { useAuthStore } from "./store/authStore";

import { useNavigate, Routes, Route } from "react-router";

import { Loader } from "./components/Loader/Loader";
import { ConfirmModal } from "./components/ConfirmModal/ConfirmModal";

import { AuthPage } from "./pages/AuthPage/AuthPage";
import { MainPage } from "./pages/MainPage/MainPage";
import { AnalyticsPage } from "./pages/AnalyticsPage/AnalyticsPage";

import "./App.scss";
import "./sass/base/base.scss";

export const App = function () {
	const navigate = useNavigate();

	const stateIsLogin = useAuthStore((state) => state.isLogin);
	const session = useAuthStore((state) => state.session);

	useEffect(() => {
		session();
	}, []);

	useEffect(() => {
		if (!stateIsLogin) {
			navigate("/");
		}
	}, [stateIsLogin]);

	return (
		<>
			<Loader />
			<ConfirmModal />
			<Routes>
				<Route path="/" element={stateIsLogin ? <MainPage /> : <AuthPage />} />
				<Route path="/analytics" element={<AnalyticsPage />} />
			</Routes>
		</>
	);
};
