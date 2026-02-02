import mongoose, { Schema } from "mongoose";

export const userSchema = new Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String, default: "user" },
});

export const userModel = mongoose.model("user", userSchema);
