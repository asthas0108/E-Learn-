// import multer from "multer";
// import { v4 as uuid } from "uuid";

// const storage = multer.diskStorage({
//     destination(req, file, cb){
//         cb(null, "uploads")
//     },
//     filename(req, file, cb) {
//         const id = uuid(); // generate random id

//         const extName = file.originalname.split(".").pop();

//         const fileName = `${id}.${extName}`;
//         cb(null, fileName);
//     }
// });

// export const uploadFiles = multer({storage}).single("file");


import multer from "multer";

const storage = multer.memoryStorage(); // store in memory as Buffer

const upload = multer({ storage });

export default upload;