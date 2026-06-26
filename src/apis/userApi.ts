import { useLoaderStore } from "../store/loaderStore";

import axios from "axios";

export const userApi = axios.create({
	baseURL: import.meta.env.DEV ? "/api/v0/auth" : import.meta.env.VITE_USERS_API
});

userApi.interceptors.request.use(
	(config) => {
		useLoaderStore.getState().setIsLoading(true);

		return config;
	},
	(error) => {
		useLoaderStore.getState().setIsLoading(true);
		return Promise.reject(error);
	}
);

userApi.interceptors.response.use(
	(response) => {
		useLoaderStore.getState().setIsLoading(false);

		return response;
	},
	(error) => {
		useLoaderStore.getState().setIsLoading(false);
		return Promise.reject(error);
	}
);
