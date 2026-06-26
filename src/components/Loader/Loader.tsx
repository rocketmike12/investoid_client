import { useLoaderStore } from "../../store/loaderStore";

import { ClipLoader } from "react-spinners";

import styles from "./Loader.module.scss";

export const Loader = function () {
	const isLoading = useLoaderStore((state) => state.isLoading);

	return (
		<>
			{isLoading && (
				<div className={styles["backdrop"]}>
					<ClipLoader loading color="#ff751d" size={"100px"} />
				</div>
			)}
		</>
	);
};
