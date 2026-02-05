import { userModel } from "../module/userSchema.js";

const register = async ({ email, password, name }) => {
    const findUser = await userModel.findOne({ email });

    if (findUser) {
        return { message: "User is already exist", status: 409 };
    }

    const newUser = new userModel({
        name,
        email,
        password,
    });

    await newUser.save();
    return { message: newUser, status: 201 };
};

const login = async ({ email, password }) => {
    const findUser = await userModel.findOne({ email, password });

    if (!findUser) {
        return { message: "Invalid email or password", status: 409 };
    }

    const passwordMatch = findUser.password === password;
    if (!passwordMatch) {
        return { message: "Invalid email or password", status: 409 };
    }

    return { message: findUser, status: 200 };
};

export { register, login };
