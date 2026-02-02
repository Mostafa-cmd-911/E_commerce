import mongoose, { Schema } from "mongoose";

export const userSchema = new Schema({
    Name: { type: String },
    Email: { type: String },
    password: { type: String },
    role: { type: String, default: "user" },
});

export const userModel = mongoose.model("user", userSchema);
