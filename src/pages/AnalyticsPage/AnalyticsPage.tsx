import { Link } from "react-router";

import { IoArrowBackSharp } from "react-icons/io5";

import { Header } from "../../components/Header/Header";
import { Balance } from "../../components/Balance/Balance";

import styles from "./AnalyticsPage.module.scss";

export const AnalyticsPage = function () {
	return (
		<>
			<Header />
			<main className={styles["analytics"]}>
				<div className={styles["analytics__top-wrap"]}>
					<Link to="/" className={styles["analytics__back"]}>
						<IoArrowBackSharp className={styles["analytics__back__icon"]} />
						<span className={styles["analytics__back__text"]}>Go back</span>
					</Link>
					<Balance />
				</div>
			</main>
		</>
	);
};
