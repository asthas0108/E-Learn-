import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (buffer,folderName = "products") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: folderName,
        resource_type: "auto"
       },
      (error, result) => {
      if (result) resolve(result.secure_url);
      else reject(error);
    });

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export default uploadToCloudinary;
export {cloudinary};