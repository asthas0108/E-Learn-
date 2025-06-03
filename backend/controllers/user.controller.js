import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../middleware/sendMail.js";
import tryCatch from "../middleware/tryCatch.js";

export const register = tryCatch(async(req, res) => {
    const {name, email, password} = req.body;

    let user = await User.findOne({email});

    if(user) {
        return res.status(400).json({
            message: "User Already Exists !",
        })
    }

    const hashPassword = await bcrypt.hash(password, 10);

    user = {
        name, 
        email, 
        password: hashPassword,
    }

    const OTP = Math.floor(Math.random() * 1000000);
    const activationToken = jwt.sign(
        {
            user,
            OTP,
        }, 
        process.env.ACTIVATION_SECRET,
        {
            expiresIn: "5m"
        }
    );

    const data = {
        name, OTP
    };

    await sendMail(
        email,
        "E-Learning",
        data,
    );

    res.status(200).json({
        message: "OTP send to your registered email !",
        activationToken,
    })
});


export const verifyUser = tryCatch(async(req, res) => {
    const {OTP, activationToken} = req.body;

    const verify = jwt.verify(activationToken, process.env.ACTIVATION_SECRET);

    if(!verify) {
        return res.status(400).json({
            message: "OTP Expired",
        });
    }
    if(verify.OTP !== OTP) {
        return res.status(400).json({
            message: "OTP does not match",
        });
    }

    await User.create({
        name: verify.user.name,
        email: verify.user.email,
        password: verify.user.password,
    })

    res.status(200).json({
        message: "User Registered Successfully !"
    })
});


export const login = tryCatch(async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(!user){
        return res.status(400).json({
            message: "No user found with this email",
        })
    };

    const matchPassword = await bcrypt.compare(password, user.password);

    if(!matchPassword){
        return res.status(400).json({
            message: "Invalid Credentials",
        })
    };

    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });

    res.json({
        message: `Welcome back ${user.name}`,
        token,
        user,
    });
});


export const myProfile = tryCatch(async(req, res) => {
    const user = await User.findById(req.user._id);

    res.json({user});
});