import mongoose, { Schema } from "mongoose";

export const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
});

export const userModel = mongoose.model("user", userSchema);
