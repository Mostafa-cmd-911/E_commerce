import { userModel } from "../module/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async ({ email, password, name }) => {
    const findUser = await userModel.findOne({ email });

    // Validate input
    if (!name || !email || !password) {
            throw {
                status: 400,
                message: "Please add all fields",
            };
        }

        // Validate email format
        // Validate password length

    // Check if user already exist
    if (findUser) {
        return { message: "User already exists", status: 400};
    }

    // Hash Password
    const hasedPassword = await bcrypt.hash(password, 10);

    // Create new user
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

    // TODO: add server error handling using try catch block and return 500 status code with error message
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
