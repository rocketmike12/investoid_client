import { Container } from "../../components/Container/Container";
import { AuthForm } from "./AuthForm/AuthForm";
import { useAuthStore } from "../../store/authStore";

export const MainPage = function () {
	return (
		<>
			<Container>
				<h1>Investoid</h1>
				<p>smart finance</p>
				<AuthForm />
			</Container>
		</>
	);
};
