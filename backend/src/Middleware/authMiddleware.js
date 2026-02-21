import jwt from "jsonwebtoken";
import { userModel } from "../module/userSchema.js";

const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await userModel.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user; // attach user to request

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

export default protect;
