export const formatDate = (dateNum: number) => {
	const date = new Date(dateNum);

	const day = date.getDay().toString();
	const month = date.getMonth().toString();
	const year = date.getFullYear().toString();

	return `${day.padStart(2, "0")}.${month.padStart(2, "0")}.${year}`;
};

export const FORM_DATA_INIT = {
	date: formatDate(Date.now()),
	description: "",
	category: "",
	subcategory: "",
	sum: ""
};

export type FormData = typeof FORM_DATA_INIT;

export const validateDate = (value: string): boolean => /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d+$/.test(value);

export const validateSum = (value: string): boolean => /^[+-]?\d+(\.\d{0,2})?$/.test(value);

export const validateForm = (formData: FormData): boolean =>
	validateDate(formData.date) && formData.description.trim().length > 0 && formData.category.trim().length > 0 && formData.subcategory.trim().length > 0 && validateSum(formData.sum);

export const formatDateInput = (value: string): string => {
	const digits = value.replace(/\D/g, "").slice(0, 8);

	if (digits.length <= 2) {
		return digits;
	}

	if (digits.length <= 4) {
		return `${digits.slice(0, 2)}.${digits.slice(2)}`;
	}

	return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4)}`;
};

export const isFormDirty = (formData: FormData): boolean => Object.values(formData).some((value) => value.trim() !== "");
