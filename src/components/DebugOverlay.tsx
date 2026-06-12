import { useAuthStore } from "../store/authStore";

export const DebugOverlay = function () {
	const isLogin = useAuthStore((state) => state.isLogin);
	const email = useAuthStore((state) => state.email);
	const operations = useAuthStore((state) => state.operations);

	const state = useAuthStore((state) => state);

	const consoleState = () => {
		console.log(state);
	};

	const logout = useAuthStore((state) => state.logout);

	return (
		<>
			<div>
				<p>isLogin: {String(isLogin)}</p>
				<p>email: {email}</p>
				<p>operations: {JSON.stringify(operations)}</p>
				<button onClick={consoleState}>console</button>
				<button onClick={logout}>log out</button>
			</div>
		</>
	);
};
