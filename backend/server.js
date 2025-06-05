import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./database/db.js";
import Razorpay from "razorpay";

// import chatbotRoutes from './routes/chatbot.routes.js';

import userRoutes from "./routes/user.routes.js"
import coursesRoutes from "./routes/courses.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import cors from "cors";

dotenv.config();

export const instance = new Razorpay({
    key_id: process.env.Razorpay_Key,
    key_secret: process.env.Razorpay_Secret,
})

const app = express();

app.use(express.json());
app.use(cors());
// app.use("/uploads", express.static("uploads"))

const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send("server is working");
})

app.use('/api', userRoutes);
app.use('/api', coursesRoutes);
app.use('/api', adminRoutes);
// app.use('/api/chatbot', chatbotRoutes);

app.listen(port, () => {
    console.log("server is working");
    connectDB();
})