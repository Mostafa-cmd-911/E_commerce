import express from "express";
import { userModel } from "../module/userSchema.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const users = await userModel.find();
    res.send(users);
});

router.post("/", async (req, res) => {
    const body = req.body;
    const newUser = new userModel(body);
    await newUser.save();
    res.status(201).send(newUser);
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await userModel.findByIdAndDelete(id);
    res.status(204).send();
});

export default router;
