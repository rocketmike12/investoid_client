import { Container } from "../../components/Container/Container";
import { AuthForm } from "./AuthForm/AuthForm";

export const AuthPage = function () {
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
