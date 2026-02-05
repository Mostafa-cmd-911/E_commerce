import { userModel } from "../module/userSchema.js";

const register = async ({ email, password, name }) => {
    const findUser = await userModel.findOne({ email });

    if (findUser) {
        throw new Error("User already exists");
    }

    const newUser = new userModel({
        name,
        email,
        password,
    });

    await newUser.save();

    return newUser;
};

const login = async ({ email, password }) => {
    const findUser = await userModel.findOne({ email, password });

    if (!findUser) {
        throw new Error("Invalid email or password");
    }

    const passwordMatch = findUser.password === password;
    if (!passwordMatch) {
        throw new Error("Invalid email or password");
    }

    return findUser;
};

export { register, login };
