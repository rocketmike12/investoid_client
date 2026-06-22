import { useConfirmStore } from "../../store/confirmStore";

import styles from "./ConfirmModal.module.scss";

export const ConfirmModal = function () {
	const { isOpen, message, confirm, cancel } = useConfirmStore();

	return (
		<>
			<div className={`${styles["backdrop"]} ${isOpen ? "" : styles["hidden"]}`}>
				<div className={styles["modal"]}>
					<p className={styles["modal__message"]}>{message}</p>
					<button className={styles["modal__confirm"]} onClick={confirm}>
						Confirm
					</button>
					<button className={styles["modal__cancel"]} onClick={cancel}>
						Cancel
					</button>
				</div>
			</div>
		</>
	);
};
