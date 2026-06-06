import { useAuthStore } from "../store/authStore";

import { userApi } from "../apis/userApi";

export const DebugOverlay = function () {
	const isLogin = useAuthStore((state) => state.isLogin);
	const email = useAuthStore((state) => state.email);
	const operations = useAuthStore((state) => state.operations);

	const state = useAuthStore((state) => state);

	const consoleState = () => {
		console.log(state);
	};

	const stateLogout = useAuthStore((state) => state.logout);

	const logoutUser = async function () {
		const res = await userApi.post("/logout");
		console.log(res);
		stateLogout();
	};

	return (
		<>
			<div>
				<p>isLogin: {String(isLogin)}</p>
				<p>email: {email}</p>
				<p>operations: {JSON.stringify(operations)}</p>
				<button onClick={consoleState}>console</button>
				<button onClick={logoutUser}>log out</button>
			</div>
		</>
	);
};
