import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import toast from "react-hot-toast";

const registerSchema = z
    .object({
        name: z.string().min(2, "Name is required"),
        email: z.string().email("Enter a valid email"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string(),
    })
    .refine(
        (data) => data.password === data.confirmPassword,
        {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        }
    );

const RegisterForm = () => {
    const { register: registerUser } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data) => {
        try {
            await registerUser({
                name: data.name,
                email: data.email,
                password: data.password,
            });

            toast.success("Registration successful");

            navigate("/");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Registration failed"
            );
        }
    };

    return (
        <form
            className="auth-form"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2>Create Account</h2>

            <input
                type="text"
                placeholder="Name"
                {...register("name")}
            />

            {errors.name && (
                <p className="error">
                    {errors.name.message}
                </p>
            )}

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

            <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
            />

            {errors.confirmPassword && (
                <p className="error">
                    {errors.confirmPassword.message}
                </p>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Creating..." : "Register"}
            </button>
        </form>
    );
};

export default RegisterForm;
