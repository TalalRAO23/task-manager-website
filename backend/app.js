import express from "express";
import cors from "cors";
import morgan from "morgan";


import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

const app = express();

const allowedOrigins = new Set([process.env.CLIENT_URL].filter(Boolean));

const isLocalDevelopmentOrigin = (origin) =>
    /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);

// Middleware
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.has(origin) || isLocalDevelopmentOrigin(origin)) {
                return callback(null, true);
            }

            return callback(new Error("Origin not allowed by CORS"));
        },
    })
);

app.get("/", (req, res) => {
    res.send("Welcome to the Task Manager API");
});

app.get("/home", (req, res) => {
    res.send("Welcome to the Task Manager Home Page");
});

app.use(express.json());

app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Error handler - must be last
app.use(errorHandler);

export default app;