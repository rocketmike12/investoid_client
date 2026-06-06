import { create } from "zustand";

import type { Operation } from "./types";

interface AuthState {
	isLogin: boolean;
	email: string | null;
	operations: Operation[];

	login: (email: string) => void;
	logout: () => void;

	addOperation: (operation: Operation) => void;
	updateOperation: (id: string, updates: Partial<Operation>) => void;
	deleteOperation: (id: string) => void;
	setOperations: (operations: Operation[]) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	isLogin: false,
	email: null,
	operations: [],

	login: (email) =>
		set({
			isLogin: true,
			email
		}),

	logout: () =>
		set({
			isLogin: false,
			email: null,
			operations: []
		}),

	addOperation: (operation) =>
		set((state) => ({
			operations: [...state.operations, operation]
		})),

	updateOperation: (id, updates) =>
		set((state) => ({
			operations: state.operations.map((op) => (op.id === id ? { ...op, ...updates } : op))
		})),

	deleteOperation: (id) =>
		set((state) => ({
			operations: state.operations.filter((op) => op.id !== id)
		})),

	setOperations: (operations) => set({ operations })
}));
