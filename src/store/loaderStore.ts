import { create } from "zustand";

type LoaderState = {
	isLoading: boolean;
	setIsLoading: (isLoading: boolean) => void;
};

export const useLoaderStore = create<LoaderState>((set) => ({
	isLoading: false,
	setIsLoading: (isLoading) => {
		set({ isLoading: isLoading });
	}
}));
