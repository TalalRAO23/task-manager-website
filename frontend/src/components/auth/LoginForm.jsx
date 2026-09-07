import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import toast from "react-hot-toast";

const loginSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        try {
            await login(data);

            toast.success("Login successful");

            navigate("/");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Login failed"
            );
        }
    };

    return (
        <form
            className="auth-form"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2>Login</h2>

            <input
                type="email"
                placeholder="Email"
                {...register("email")}
            />

            {errors.email && (
                <p className="error">
                    {errors.email.message}
                </p>
            )}

            <input
                type="password"
                placeholder="Password"
                {...register("password")}
            />

            {errors.password && (
                <p className="error">
                    {errors.password.message}
                </p>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Logging in..." : "Login"}
            </button>
        </form>
    );
};

export default LoginForm;
