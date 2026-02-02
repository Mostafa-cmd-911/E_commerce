import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/users.js";

const app = express();

const PORT = 3000;

const allowedOrigins = [
    "http://localhost:5173/",
    "https://unmeasuredly-unplentiful-lynsey.ngrok-free.dev",
];

app.use(express.json());
app.use(
    cors({
        origin: allowedOrigins,
    }),
);

app.use("/users", userRoutes);

mongoose
    .connect("mongodb://127.0.0.1:27017/E-Commerce")
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ Database connection error:", err));

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}/users`);
});
