import tryCatch from "../middleware/tryCatch.js";
import { Course } from "../models/courses.model.js";
import { Lecture } from "../models/lecture.model.js";
import { rm } from "fs";
import { promisify } from "util";
import fs from "fs";
import { User } from "../models/user.model.js";
import uploadToCloudinary from "../config/cloudinary.js";
import { cloudinary } from "../config/cloudinary.js";

export const createCourse = tryCatch(async(req, res) => {
    const {title, description, category, createdBy, duration, price} = req.body;

    const image = req.file;

    let imageUrl = await uploadToCloudinary(image.buffer, "T-shirts");

    // await Course.create({
    //     title,
    //     description,
    //     category,
    //     image: image?.path, 
    //     duration,
    //     price,
    //     createdBy, 
    // });

    await Course.create({
        title,
        description,
        category,
        image: imageUrl, 
        duration,
        price,
        createdBy, 
    });

    res.status(200).json({
        message: "Course Created Successfully !"
    })
});

export const addLectures = tryCatch(async(req, res) => {
    const course = await Course.findById(req.params.id);

    if(!course) {
        return res.status(404).json({
            message: "No Course with this id was found !"
        })
    }

    const {title, description} = req.body;

    const file = req.file;
    if (!file) {
        return res.status(400).json({
        message: "No video file uploaded!",
        });
    }

    const videoUrl = await uploadToCloudinary(file.buffer, "lectures");

    const lecture = await Lecture.create({
        title,
        description,
        video: videoUrl,
        course: course._id,
    });

    // const lecture = await Lecture.create({
    //     title,
    //     description,
    //     video: file?.path,
    //     course: course._id,
    // });

    res.status(201).json({
        message: "Lecture Added Successfully !",
        lecture,
    })
});


export const deleteLecture = tryCatch(async(req, res) => {
    const lecture = await Lecture.findById(req.params.id);

    rm(lecture.video, () => {
        console.log("video deleted");
    });

    await Lecture.deleteOne();
    res.json({message: "Lecture Deleted"});
});

const unlinkAsync = promisify(fs.unlink);

// export const deleteCourse = tryCatch(async(req, res) => {
//     const course = await Course.findById(req.params.id);

//     const lectures = await Lecture.find({course: course._id});

//     await Promise.all(
//         lectures.map(async(lecture) => {
//             await unlinkAsync(lecture.video);
//             console.log("video deleted");
//         })
//     )
//     rm(course.image, () => {
//         console.log("deleted image");
//     })

//     await Lecture.find({course: req.params.id}).deleteMany();

//     await Course.deleteOne();

//     await User.updateMany({}, {$pull: {subscription: req.params.id}});

//     res.json({message: "Course Deleted"});
// });

export const deleteCourse = tryCatch(async (req, res) => {
  const course = await Course.findById(req.params.id);
  const lectures = await Lecture.find({ course: course._id });

  await Promise.all(
    lectures.map(async (lecture) => {
      // Extract public_id from the URL to delete the video on Cloudinary
      // Example URL: https://res.cloudinary.com/dqsyrox3a/video/upload/v1749451275/lectures/bx1yzk66aolnkjfd5981.mp4
      const publicId = getPublicIdFromUrl(lecture.video);
      if (publicId) {
        await cloudinary.api.delete_resources([publicId], { resource_type: 'video' });
        console.log('Video deleted:', publicId);
      }
    })
  );

  rm(course.image, () => {
    console.log('Deleted image');
  });

  await Lecture.deleteMany({ course: req.params.id });
  await Course.deleteOne({ _id: req.params.id });
  await User.updateMany({}, { $pull: { subscription: req.params.id } });

  res.json({ message: 'Course Deleted' });
});

function getPublicIdFromUrl(url) {
  try {
    // The public_id is usually the part after /upload/ and before the extension
    // For example: lectures/bx1yzk66aolnkjfd5981
    const parts = url.split('/');
    const uploadIndex = parts.findIndex((p) => p === 'upload');
    if (uploadIndex === -1) return null;

    // Get everything after 'upload/' (excluding version prefix if any)
    let publicIdWithVersionAndExt = parts.slice(uploadIndex + 1).join('/'); // e.g. "v1749451275/lectures/bx1yzk66aolnkjfd5981.mp4"
    
    // Remove version prefix (starts with 'v' followed by digits)
    publicIdWithVersionAndExt = publicIdWithVersionAndExt.replace(/^v\d+\//, ''); // e.g. "lectures/bx1yzk66aolnkjfd5981.mp4"

    // Remove extension
    const publicId = publicIdWithVersionAndExt.replace(/\.[^/.]+$/, ""); // "lectures/bx1yzk66aolnkjfd5981"

    return publicId;
  } catch {
    return null;
  }
}

export const getAllStats = tryCatch(async(req, res) => {
    const totalCourses = (await Course.find()).length;
    const totalLectures = (await Lecture.find()).length;
    const totalUsers = (await User.find()).length;

    const stats = {
        totalCourses,
        totalLectures,
        totalUsers,
    }

    res.json({
        stats,
    });
});

export const getAllUsers = tryCatch(async (req, res) => {
    const users = await User.find({_id: {$ne: req.user._id}})
    .select("-password");

    res.json({users});
});

export const updateRole = tryCatch(async (req, res) => {
    const user = await User.findById(req.params.id);

    if(user.role === "user"){
        user.role = "admin";
        await User.save();

        return res.status(200).json({
            message: "role updated to admin"
        })
    }

    if(user.role === "admin"){
        user.role = "user";
        await User.save();

        return res.status(200).json({
            message: "role updated to user"
        })
    }
})