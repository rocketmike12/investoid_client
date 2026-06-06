import axios from "axios";

export const userApi = axios.create({
	baseURL: import.meta.env.DEV ? "/api/v0/auth" : import.meta.env.VITE_USERS_API
});
