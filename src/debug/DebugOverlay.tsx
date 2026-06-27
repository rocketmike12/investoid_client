import { useAuthStore } from "../store/authStore";
import { mockOperations } from "./data";

export const DebugOverlay = function () {
	const isLogin = useAuthStore((state) => state.isLogin);
	const email = useAuthStore((state) => state.email);
	const operations = useAuthStore((state) => state.operations);
	const addOperation = useAuthStore((state) => state.addOperation);

	const state = useAuthStore((state) => state);

	const consoleState = () => {
		console.log(state);
	};

	const logout = useAuthStore((state) => state.logout);

	const addMockOperations = () => {
		mockOperations.forEach((operation) => addOperation(operation));
	};

	return (
		<>
			<div>
				<p>isLogin: {String(isLogin)}</p>
				<p>email: {email}</p>
				<p>operations: {JSON.stringify(operations)}</p>
				<button onClick={consoleState}>console</button>
				<button onClick={logout}>log out</button>
				<button onClick={addMockOperations}>add test operations</button>
			</div>
		</>
	);
};
