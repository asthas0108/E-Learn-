import tryCatch from "../middleware/tryCatch.js";
import { Course } from "../models/courses.model.js";
import { Lecture } from "../models/lecture.model.js";
import { Payment } from "../models/payment.model.js";
import { Progress } from "../models/progress.model.js";
import { User } from "../models/user.model.js";
import { instance } from "../server.js";
import crypto from "crypto";

export const getAllCourses = tryCatch(async(req, res) => {
    const courses = await Course.find();
    res.json({
        courses,
    });
});

export const getSingleCourse = tryCatch(async(req, res) => {
    const course = await Course.findById(req.params.id);
    res.json({
        course,
    })
});

export const fetchLectures = tryCatch(async(req, res) => {
    const lectures = await Lecture.find({course: req.params.id});

    const user = await User.findById(req.user._id);

    if(user.role === "admin"){
        return res.json({lectures});
    }

    if(!user.subscription.includes(req.params.id)) {
        return res.status(400).json({
            message: "You have not subscribed this course."
        })
    }

    res.json({lectures});
});

export const fetchLecture = tryCatch(async(req, res) => {
    const lecture = await Lecture.findById(req.params.id);

    const user = await User.findById(req.user._id);

    if(user.role === "admin"){
        return res.json({lecture});
    }

    if(!user.subscription.includes(lecture.course)) {
        return res.status(400).json({
            message: "You have not subscribed this course."
        })
    }

    res.json({lecture});
});


export const getMyCourses = tryCatch(async(req, res) => {
    const courses = await Course.find({_id: req.user.subscription});

    res.json({
        courses,
    });
});

export const checkout = tryCatch(async(req, res) => {
    const user = await User.findById(req.user._id);

    const course = await Course.findById(req.params.id);

    if(user.subscription.includes(course._id)) {
        res.status(400).json({
            message: "You already have this course",
        });
    }

    const options = {
        amount: Number(course.price * 100),
        currency: "INR",
    };

    const order = await instance.orders.create(options);

    res.status(201).json({
        order,
        course,
    });
});

export const paymentVerification = tryCatch(async(req, res) => {
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto.createHmac("sha256", process.env.Razorpay_Secret).update(body).digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if(isAuthentic) {
        await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        });

        const user = await User.findById(req.user._id);
        const course = await Course.findById(req.params.id);

        user.subscription.push(course._id);
        
        await Progress.create({
            course: course._id,
            completedLectures: [],
            user: req.user._id
        })

        await user.save();

        return res.status(200).json({
            message: "Course purchased successfully !"
        })
    }else {
        return res.status(400).json({
            message: "Payment Failed",
        })
    }
});


export const addProgress = tryCatch(async(req, res) => {
    const progress = await Progress.findOne({
        user: req.user._id,
        course: req.query.course,
    });

    const {lectureId} = req.query;

    if(progress.completedLectures.includes(lectureId)){
        return res.json({
            message: "progress recorded",
        });
    }

    progress.completedLectures.push(lectureId);
    await progress.save();

    res.status(201).json({
        message: "new progress added",
    })
});

export const getYourProgress = tryCatch(async (req, res) => {
    const progress = await Progress.findOne({
        user: req.user._id,
        course: req.query.course,
    });

    // if(!progress) {
    //     return res.status(404).json({ message: "null" })
    // }
    if (!progress) {
        console.log("No progress found for", req.user._id, req.query.course);
        return res.status(404).json({ message: "null" });
    }


    const allLectures = (await Lecture.find({course: req.query.course})).length;
    const completedLectures = progress.completedLectures.length;
    const courseProgressPercent = (completedLectures * 100)/allLectures;

    res.json({
        courseProgressPercent,
        completedLectures,
        allLectures,
        progress,
    })
})