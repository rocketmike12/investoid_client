import type { ContainerProps } from "./Container.types.ts";

import styles from "./Container.module.scss";

export const Container = function ({ children, ...props }: ContainerProps) {
	return (
		<div {...props} className={styles["container"]}>
			{children}
		</div>
	);
};
