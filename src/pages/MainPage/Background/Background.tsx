import type { ContainerProps } from "../../../components/Container/Container.types";
import { Container } from "../../../components/Container/Container";

import styles from "./Background.module.scss";

export const Background = function ({ children }: ContainerProps) {
	return (
		<>
			<Container>
				<div className={styles["background"]}>{children}</div>
			</Container>
		</>
	);
};
