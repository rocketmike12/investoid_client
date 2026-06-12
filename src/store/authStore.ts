import { create } from "zustand";

import { userApi } from "../apis/userApi";

import type { Operation } from "./types";

import Swal from "sweetalert2";

interface AuthState {
	isLogin: boolean;
	email: string | null;
	operations: Operation[];

	login: (email: string, password: string) => void;
	register: (email: string, password: string) => void;
	session: () => void;
	logout: () => void;

	addOperation: (operation: Operation) => void;
	deleteOperation: (id: string) => void;
	// updateOperation: (id: string, updates: Partial<Operation>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	isLogin: false,
	email: null,
	operations: [],

	login: async (email, password) => {
		try {
			const { data } = await userApi.post("/login", { email: email, password: password }, { withCredentials: true });
			console.log(data);

			set({
				isLogin: true,
				email: data.email,
				operations: data.operations
			});
		} catch (err: any) {
			if (err.status === 401) {
				Swal.fire({
					text: "login incorrect",
					icon: "error",
					toast: true
				});
			}

			console.error(err);
		}
	},

	register: async (email, password) => {
		try {
			const { data } = await userApi.post("/register", { email, password }, { withCredentials: true });

			set({
				isLogin: true,
				email: data.email,
				operations: data.operations
			});
		} catch (err: any) {
			if (err.status === 409) {
				Swal.fire({
					text: "this email is already in use",
					icon: "error",
					toast: true
				});
			}

			console.error(err);
		}
	},

	session: async () => {
		try {
			const { data } = await userApi.post("/session", "", { withCredentials: true });

			set({
				isLogin: true,
				email: data.email,
				operations: data.operations
			});
		} catch (err: any) {
			if (err.status === 401) {
				return;
			}

			console.error(err);
		}
	},

	logout: async () => {
		const { data } = await userApi.post("/logout");
		console.log(data);

		set({
			isLogin: false,
			email: null,
			operations: []
		});
	},

	addOperation: async (operation) => {
		const { data } = await userApi.post("/operation/add", { operation }, { withCredentials: true });

		set(() => ({
			operations: data.operations
		}));
	},

	deleteOperation: async (id) => {
		const { data } = await userApi.post("/operation/del", { id }, { withCredentials: true });

		set(() => ({
			operations: data.operations
		}));
	}

	// updateOperation: (id, updates) =>
	// 	set((state) => ({
	// 		operations: state.operations.map((op) => (op.id === id ? { ...op, ...updates } : op))
	// 	}))
}));
