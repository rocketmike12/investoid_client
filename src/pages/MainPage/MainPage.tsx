import { Header } from "../../components/Header/Header";
import { Background } from "./Background/Background";
import { AddOperation } from "./AddOperation/AddOperation";
import { Operations } from "./Operations/Operations";

import styles from "./MainPage.module.scss";

export const MainPage = function () {
	return (
		<>
			<Header />
			<main className={styles["main"]}>
				<Background>
					<AddOperation />
					<Operations />
				</Background>
			</main>
		</>
	);
};
