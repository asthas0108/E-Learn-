import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const isAuth = async(req, res, next) => {
    try {
        const token = req.headers.token;

        if(!token) {
            return res.status(403).json({
                message: "Please Login",
            });
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedData) {
            return res.status(401).json({ message: "Invalid token" });
        }
        
        req.user = await User.findById(decodedData._id);

        next();
    }catch(err) {
        return res.status(500).json({
            message: "Login First",
        })
    }
};


export const isAdmin = (req, res, next) => {
    try{
        if(req.user.role !== "admin") {
            return res.status(403).json({
                message: "you are not admin",
            });
        }
        next();
    }catch(err) {
        return res.status(500).json({
            message: err.message,
        })
    }
}