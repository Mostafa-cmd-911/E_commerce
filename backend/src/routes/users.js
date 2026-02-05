import express from "express";
import { register, login } from "../services/userService.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const users = await userModel.find();
    res.send(users);
});

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const user = await register({ name, email, password });
    res.status(user.status).send(user);
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await login({ email, password });
    res.status(user.status).send(user);
});

export default router;
