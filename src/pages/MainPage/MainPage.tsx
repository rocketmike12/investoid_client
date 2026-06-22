import { Header } from "../../components/Header/Header";
import { Balance } from "./Balance/Balance";
import { Background } from "./Background/Background";
import { AddOperation } from "./AddOperation/AddOperation";
import { Operations } from "./Operations/Operations";

import { ConfirmModal } from "../../components/ConfirmModal/ConfirmModal";

import styles from "./MainPage.module.scss";

export const MainPage = function () {
	const handleConfirm = () => {};
	const handleCancel = () => {};

	return (
		<>
			<ConfirmModal onConfirm={handleConfirm} onCancel={handleCancel} />

			<Header />
			<main className={styles["main"]}>
				<Balance />
				<Background>
					<AddOperation />
					<Operations />
				</Background>
			</main>
		</>
	);
};
