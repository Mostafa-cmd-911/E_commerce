import express from "express";
import { register, login } from "../services/userService";

const router = express.Router();

router.get("/", async (req, res) => {
    const users = await userModel.find();
    res.send(users);
});

router.post("/register", async (req, res) => {
    const user = await register(req.body);
    res.status(201).send(user);
});

router.post("/login", async (req, res) => {
    const user = await login(req.body);
    res.status(200).send(user);
});

export default router;
