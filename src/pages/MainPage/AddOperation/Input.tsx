import type { InputProps } from "./AddOperation.types";

export const Input = function ({ className, error, errorClassName, ...props }: InputProps) {
	return <input {...props} className={`${className} ${errorClassName && error ? errorClassName : ""}`} />;
};
