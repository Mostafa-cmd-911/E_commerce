import express from "express";
import { register, login } from "../services/userService.js";
import { userModel } from "../module/userSchema.js";
import protect from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const users = await userModel.find();
    res.send(users);
});

router.get("/me", protect, async (req, res) => {
    res.status(200).json(req.user);
});

router.post("/register", async (req, res) => {
    const user = await register(req.body);
    res.status(user.status).send(user);
});

router.post("/login", async (req, res) => {
    const user = await login(req.body);
    res.status(user.status).send(user);
});

export default router;
