import { Container } from "../../components/Container/Container";
import { Header } from "../../components/Header/Header";
import { AuthForm } from "./AuthForm/AuthForm";

export const AuthPage = function () {
	return (
		<>
			<Header />
			<Container>
				<h1>Investoid</h1>
				<p>smart finance</p>
				<AuthForm />
			</Container>
		</>
	);
};
