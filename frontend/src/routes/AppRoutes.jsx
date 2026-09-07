import {
    createBrowserRouter,
} from "react-router-dom";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

import AuthLayout from "../layouts/AuthLayout";
import PrivateLayout from "../layouts/PrivateLayout";
import PublicLayout from "../layouts/PublicLayout";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
    {
        element: <PublicRoute />,
        children: [
            {
                element: <AuthLayout />,
                children: [
                    {
                        path: "/login",
                        element: <Login />,
                    },
                    {
                        path: "/register",
                        element: <Register />,
                    },
                ],
            },
        ],
    },

    {
        element: <PrivateRoute />,
        children: [
            {
                element: <PrivateLayout />,
                children: [
                    {
                        path: "/",
                        element: <Home />,
                    },
                ],
            },
        ],
    },

    {
        element: <PublicLayout />,
        children: [
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);

export default router;