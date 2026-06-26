import { create } from "zustand";

import { userApi } from "../apis/userApi";

import type { Operation } from "./types";

import { toMinor } from "../utils/money";

import Swal from "sweetalert2";

interface AuthState {
	isLogin: boolean;
	email: string | null;
	balance: number;
	operations: Operation[];

	login: (email: string, password: string) => void;
	register: (email: string, password: string) => void;
	session: () => void;
	logout: () => void;

	setBalance: (balance: number) => void;

	addOperation: (operation: Operation) => void;
	deleteOperation: (id: string) => void;
	// updateOperation: (id: string, updates: Partial<Operation>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	isLogin: false,
	email: null,
	balance: 0,
	operations: [],

	login: async (email, password) => {
		try {
			const { data } = await userApi.post("/login", { email: email, password: password }, { withCredentials: true });

			set({
				isLogin: true,
				email: data.email,
				balance: data.balance,
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
				balance: data.balance,
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
				balance: data.balance,
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
		await userApi.post("/logout");

		set({
			isLogin: false,
			email: null,
			balance: 0,
			operations: []
		});
	},

	setBalance: async (balance) => {
		const { data } = await userApi.post("/balance", { balance: toMinor(balance) });

		set({
			balance: data.balance,
			operations: data.operations
		});
	},

	addOperation: async (operation) => {
		const normalizedOperation = {
			...operation,
			sum: toMinor(operation.sum)
		};

		const { data } = await userApi.post("/operation/add", { operation: normalizedOperation }, { withCredentials: true });

		set(() => ({
			balance: data.balance,
			operations: data.operations
		}));
	},

	deleteOperation: async (id) => {
		const { data } = await userApi.post("/operation/del", { id }, { withCredentials: true });

		set(() => ({
			balance: data.balance,
			operations: data.operations
		}));
	}
}));
