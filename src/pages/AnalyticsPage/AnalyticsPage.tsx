import { useEffect, useMemo, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { getAnalytics, useWindowDimensions } from "./helpers";

import { Link } from "react-router";
import { IoArrowBackSharp } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList } from "recharts";

import { Container } from "../../components/Container/Container";
import { Header } from "../../components/Header/Header";
import { Balance } from "../../components/Balance/Balance";

import styles from "./AnalyticsPage.module.scss";

export const AnalyticsPage = () => {
	const operations = useAuthStore((state) => state.operations);

	const analyticsData = useMemo(() => getAnalytics(operations), [operations]);

	const [currentMonth, setCurrentMonth] = useState(0);

	useEffect(() => {
		if (analyticsData.length) {
			setCurrentMonth(analyticsData.length - 1);
		}
	}, [analyticsData]);

	const monthData = analyticsData.length > 0 ? analyticsData[((currentMonth % analyticsData.length) + analyticsData.length) % analyticsData.length] : null;

	type Mode = "income" | "expenses";

	const [mode, setMode] = useState<Mode>("income");

	const toggleMode = () => {
		setMode((prev) => (prev === "income" ? "expenses" : "income"));
	};

	const categories = operations.map((op) => op.category);
	type Category = (typeof categories)[number];

	const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

	const { width } = useWindowDimensions();

	if (!monthData) {
		return (
			<>
				<Header />
				<main className={styles["analytics"]}>
					<div className={styles["analytics__top-wrap"]}>
						<Link to="/" className={styles["analytics__back"]}>
							<IoArrowBackSharp />
							<span>Go back</span>
						</Link>

						<Balance />
					</div>

					<p>No analytics yet.</p>
				</main>
			</>
		);
	}

	console.log(Object.entries(monthData.categories[selectedCategory || "food"].subcategories).map((el) => ({ name: el[0], amt: el[1] })));

	return (
		<>
			<Header />

			<main className={styles["analytics"]}>
				<div className={styles["analytics__top-wrap"]}>
					<Link to="/" className={styles["analytics__back"]}>
						<IoArrowBackSharp className={styles["analytics__back__icon"]} />
						<span className={styles["analytics__back__text"]}>Go back</span>
					</Link>

					<div className={styles["analytics__month"]}>
						<button
							onClick={() => {
								setCurrentMonth((m) => m - 1);
							}}
							className={styles["analytics__month__decrement"]}
						>
							<IoIosArrowBack className={styles["analytics__month__decrement__icon"]} />
						</button>

						<span>{monthData.key}</span>

						<button
							onClick={() => {
								setCurrentMonth((m) => m + 1);
							}}
							className={styles["analytics__month__increment"]}
						>
							<IoIosArrowForward className={styles["analytics__month__increment__icon"]} />
						</button>
					</div>

					<Balance />
				</div>

				<Container>
					<div className={styles["analytics__summary"]}>
						<div className={styles["analytics__summary__expenses"]}>
							<p className={styles["analytics__summary__expenses__title"]}>Expenses</p>
							<p className={styles["analytics__summary__expenses__sum"]}>{monthData.expenses.toFixed(2)}</p>
						</div>

						<div className={styles["analytics__summary__income"]}>
							<p className={styles["analytics__summary__income__title"]}>Income</p>
							<p className={styles["analytics__summary__income__sum"]}>+{monthData.incomes.toFixed(2)}</p>
						</div>
					</div>

					<div className={styles["analytics__bottom-wrap"]}>
						<div className={styles["analytics__mode"]}>
							<button
								onClick={() => {
									toggleMode();
								}}
								className={styles["analytics__mode__decrement"]}
							>
								<IoIosArrowBack className={styles["analytics__mode__decrement__icon"]} />
							</button>

							<span>{mode}</span>

							<button
								onClick={() => {
									toggleMode();
								}}
								className={styles["analytics__mode__increment"]}
							>
								<IoIosArrowForward className={styles["analytics__mode__increment__icon"]} />
							</button>
						</div>

						<ul className={styles["analytics__categories"]}>
							{Object.entries(monthData.categories)
								.filter((el) => (el[1].sum > 0 && mode == "income") || (el[1].sum < 0 && mode == "expenses"))
								.map((el) => (
									<li
										key={el[0]}
										onClick={() => {
											setSelectedCategory(el[0]);
										}}
										className={`${styles["analytics__categories__item"]} ${styles["selected"]}`}
									>
										<span>{el[0]}</span>
										<span>{(el[1].sum > 0 ? "+" : "") + el[1].sum.toFixed(2)}</span>
									</li>
								))}
						</ul>

						{selectedCategory && monthData?.categories?.[selectedCategory] && (
							<>
								{width < 768 ? (
									<ResponsiveContainer width="100%" height={320}>
										<BarChart
											layout="vertical"
											data={Object.entries(monthData.categories[selectedCategory].subcategories || {})
												.map(([name, sum]) => ({
													name,
													sum: Math.abs(sum)
												}))
												.sort((a, b) => b.sum - a.sum)}
											margin={{ top: 20, bottom: 20, left: 20, right: 20 }}
											barSize={18}
										>
											<CartesianGrid strokeDasharray="3 3" />

											<XAxis type="number" fontSize={12} />

											<YAxis type="category" dataKey="name" hide padding={{ top: 10, bottom: 10 }} />

											<Bar dataKey="sum" fill="#ff751daa" activeBar={{ fill: "#ff751d" }} radius={[0, 10, 10, 0]}>
												<LabelList
													dataKey="name"
													content={(props: any) => {
														const { x, y, value } = props;

														return (
															<text x={x} y={y - 5} fill="#000000" fontSize={12} fontWeight={400}>
																{value}
															</text>
														);
													}}
												/>

												<LabelList
													dataKey="sum"
													content={(props: any) => {
														const { x, y, value } = props;

														return (
															<text x={x} y={y + 30} fill="#000000" fontSize={12} fontWeight={400}>
																{value.toFixed(2)}
															</text>
														);
													}}
												/>
											</Bar>
										</BarChart>
									</ResponsiveContainer>
								) : (
									<ResponsiveContainer width="100%" height={320}>
										<BarChart
											layout="horizontal"
											data={Object.entries(monthData.categories[selectedCategory].subcategories || {})
												.map(([name, sum]) => ({
													name,
													sum: Math.abs(sum)
												}))
												.sort((a, b) => b.sum - a.sum)}
											margin={{ top: 20, bottom: 20, left: 20, right: 20 }}
											barSize={18}
										>
											<CartesianGrid strokeDasharray="3 3" />

											<XAxis type="category" dataKey="name" fontSize={12} />

											<YAxis type="number" hide />

											<Tooltip
												wrapperStyle={{
													fontSize: "12px",
													fontWeight: 700
												}}
											/>

											<Bar dataKey="sum" fill="#ff751daa" activeBar={{ fill: "#ff751d" }} radius={[10, 10, 0, 0]}>
												<LabelList
													dataKey="sum"
													position="top"
													style={{
														fill: "#000000",
														fontSize: 12,
														fontWeight: 400
													}}
													formatter={(value: any) => Number(value).toFixed(2)}
												/>
											</Bar>
										</BarChart>
									</ResponsiveContainer>
								)}
							</>
						)}
					</div>
				</Container>
			</main>
		</>
	);
};
