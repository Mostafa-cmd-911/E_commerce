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
    return { message: generateJWT({ name, email, password }), status: 201 };
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
        message: generateJWT({ name: findUser.name, email, password }),
        status: 200,
    };
};

const generateJWT = (data) => {
    return jwt.sign(data, "jYmeO01Fi6XSHvMSya8vuHvbQ502zYlzBO8iLw/6iI8=");
};

export { register, login };
