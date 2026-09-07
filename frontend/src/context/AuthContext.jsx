import { useEffect, useState } from "react";
import {
    registerUser,
    loginUser,
    getMe,
} from "../api/authApi.js";
import { AuthContext } from "./authContext.js";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const isAuthenticated = !!user;

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const data = await getMe();
                setUser(data.user);
            } catch {
                localStorage.removeItem("token");
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        loadUser();
    }, []);

    const login = async (data) => {
        const response = await loginUser(data);

        localStorage.setItem("token", response.token);
        setUser(response.user);

        return response;
    };

    const register = async (data) => {
        const response = await registerUser(data);

        localStorage.setItem("token", response.token);
        setUser(response.user);

        return response;
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isLoading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
