import { create } from "zustand";

type ConfirmState = {
	isOpen: boolean;
	message: string;
	resolve: ((value: boolean) => void) | null;

	openConfirm: (message: string) => Promise<boolean>;
	confirm: () => void;
	cancel: () => void;
	close: () => void;
};

export const useConfirmStore = create<ConfirmState>((set, get) => ({
	isOpen: false,
	message: "",
	resolve: null,

	openConfirm: (message: string) => {
		return new Promise<boolean>((resolve) => {
			set({
				isOpen: true,
				message,
				resolve
			});
		});
	},

	confirm: () => {
		const resolve = get().resolve;
		if (resolve) resolve(true);

		set({
			isOpen: false,
			message: "",
			resolve: null
		});
	},

	cancel: () => {
		const resolve = get().resolve;
		if (resolve) resolve(false);

		set({
			isOpen: false,
			message: "",
			resolve: null
		});
	},

	close: () => {
		get().cancel();
	}
}));
