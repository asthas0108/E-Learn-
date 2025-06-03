import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("db connected");
    }catch(err) {
        console.log(err);
    }
}


// 0Kc3ZJsVzvsqq6n9