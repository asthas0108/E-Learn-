import { Router } from "express";
import { isAdmin, isAuth } from "../middleware/isAuth.js";
import { addLectures, createCourse, deleteCourse, deleteLecture, getAllStats, getAllUsers, updateRole } from "../controllers/admin.controller.js";
// import upload, { uploadFiles } from "../middleware/multer.js";
import upload from "../middleware/multer.js";


const router = Router();

router.route("/course/new").post(isAuth, isAdmin, upload.single("image"), createCourse);
router.route("/course/:id").post(isAuth, isAdmin, upload.single("file"), addLectures);
router.route("/lecture/:id").delete(isAuth, isAdmin, deleteLecture);
router.route("/course/:id").delete(isAuth, isAdmin, deleteCourse);
router.route("/stats").get(isAuth, isAdmin, getAllStats);
router.route("/user/:id").put(isAuth, isAdmin, updateRole);
router.route("/users").get(isAuth, isAdmin, getAllUsers);

export default router;