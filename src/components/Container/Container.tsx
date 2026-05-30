import type { ContainerProps } from "./Container.types.ts";

import styles from "./Container.module.scss";

export const Container = function ({ children }: ContainerProps) {
	return <div className={styles["container"]}>{children}</div>;
};
