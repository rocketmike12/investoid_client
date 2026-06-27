import { useState } from "react";

import { useAuthStore } from "../../store/authStore";

import { getMonthList, getAnalytics } from "./helpers";

import { Link } from "react-router";

import { IoArrowBackSharp } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { Header } from "../../components/Header/Header";
import { Balance } from "../../components/Balance/Balance";

import styles from "./AnalyticsPage.module.scss";

export const AnalyticsPage = function () {
	const operations = useAuthStore((state) => state.operations);
	const months = getMonthList(operations);

	const [currentMonth, setCurrentMonth] = useState(0);

	console.log(getAnalytics(operations));

	return (
		<>
			<Header />
			<main className={styles["analytics"]}>
				<div className={styles["analytics__top-wrap"]}>
					<Link to="/" className={styles["analytics__back"]}>
						<IoArrowBackSharp className={styles["analytics__back__icon"]} />
						<span className={styles["analytics__back__text"]}>Go back</span>
					</Link>
					<div className="analytics__month">
						<button
							onClick={() => {
								setCurrentMonth(currentMonth - 1);
							}}
						>
							<IoIosArrowBack />
						</button>
						<span>{months[currentMonth % months.length]}</span>
						<button
							onClick={() => {
								setCurrentMonth(currentMonth + 1);
							}}
						>
							<IoIosArrowForward />
						</button>
					</div>
					<Balance />
				</div>
			</main>
		</>
	);
};
