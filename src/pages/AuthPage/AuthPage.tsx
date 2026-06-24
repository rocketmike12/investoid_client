import { Container } from "../../components/Container/Container";
import { Header } from "../../components/Header/Header";
import { AuthForm } from "./AuthForm/AuthForm";

import styles from "./AuthPage.module.scss";

export const AuthPage = function () {
	return (
		<>
			<Header />
			<section id="auth" className={styles["auth"]}>
				<Container>
					<div className={styles["auth__title-wrap"]}>
						<h1 className={styles["auth__title"]}>Investoid</h1>
						<p className={styles["auth__subtitle"]}>smart finance</p>
					</div>
					<AuthForm />
				</Container>
			</section>
		</>
	);
};
