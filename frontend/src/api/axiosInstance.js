import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const isAuthRequest = error.config?.url?.startsWith("/auth/");

        // A 401 from login is an expected form error (for example, invalid
        // credentials). Redirecting here reloads the page before LoginForm can
        // display its error toast. Only expire an existing session when a
        // protected request is rejected.
        if (error.response?.status === 401 && !isAuthRequest) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
