import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRouter = async (req, res, next) => {
    try{
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded){
            return res.status(401).json({ message: "User Token not valid token" });
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user){
            return res.status(404).json({ message: "User not found in database" });
        }

        req.user = user

        next();
    } catch (error) {
        console.log("Error while trying to get token" + error);
        res.status(500).json({ message: "Something is wrong in middleware token" });
    }
}