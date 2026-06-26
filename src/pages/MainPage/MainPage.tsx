import { useState } from "react";

import { Header } from "../../components/Header/Header";
import { Balance } from "./Balance/Balance";
import { Background } from "./Background/Background";
import { AddOperation } from "./AddOperation/AddOperation";
import { Operations } from "./Operations/Operations";

import { ConfirmModal } from "../../components/ConfirmModal/ConfirmModal";

import styles from "./MainPage.module.scss";

export const MainPage = function () {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	return (
		<>
			<ConfirmModal />

			<button
				className={styles["add-button"]}
				onClick={() => {
					setIsVisible(!isVisible);
				}}
			>
				{isVisible ? "×" : "+"}
			</button>

			<Header />
			<main className={styles["main"]}>
				<Balance />
				<Background>
					<AddOperation isVisible={isVisible} />
					<Operations />
				</Background>
			</main>
		</>
	);
};
