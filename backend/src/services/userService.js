import { userModel } from "../module/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async ({ email, password, name }) => {
    const findUser = await userModel.findOne({ email });

    if (findUser) {
        return { message: "User is already exist", status: 409 };
    }

    const hasedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
        name,
        email,
        password: hasedPassword,
    });

    await newUser.save();
    return {
        success: true,
        message: "User registered successfully",
        token: generateJWT({
            email,
            role: newUser.role,
            id: newUser._id,
        }),
        status: 201,
        user: { name: newUser.name, email: newUser.email },
    };
};

const login = async ({ email, password }) => {
    const findUser = await userModel.findOne({ email });

    if (!findUser) {
        return { message: "Invalid email or password", status: 400 };
    }

    const passwordMatch = await bcrypt.compare(password, findUser.password);

    if (!passwordMatch) {
        return { message: "Invalid email or password", status: 400 };
    }

    return {
        success: true,
        message: "Logged in successfully",
        token: generateJWT({
            email,
            role: findUser.role,
            id: findUser._id,
        }),
        status: 201,
        user: { name: findUser.name, email: findUser.email },
    };
};

const generateJWT = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET_KEY);
};

export { register, login };
