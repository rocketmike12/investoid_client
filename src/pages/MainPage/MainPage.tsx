import { useState } from "react";

import { Link } from "react-router";

import { MdBarChart } from "react-icons/md";

import { Header } from "../../components/Header/Header";
import { Balance } from "../../components/Balance/Balance";
import { Background } from "./Background/Background";
import { AddOperation } from "./AddOperation/AddOperation";
import { Operations } from "./Operations/Operations";

import styles from "./MainPage.module.scss";

export const MainPage = function () {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	return (
		<>
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
				<div className={styles["main__top-wrap"]}>
					<Balance />
					<Link to="/analytics" className={styles["main__analytics"]}>
						<span className={styles["main__analytics__text"]}>View analytics</span>
						<MdBarChart className={styles["main__analytics__icon"]} />
					</Link>
				</div>
				<Background>
					<AddOperation isVisible={isVisible} />
					<Operations />
				</Background>
			</main>
		</>
	);
};
