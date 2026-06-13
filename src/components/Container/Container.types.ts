import type { ReactNode, ComponentProps } from "react";

export interface ContainerProps extends ComponentProps<"div"> {
	children: ReactNode;
}
