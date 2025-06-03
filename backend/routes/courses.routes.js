import { Router } from "express";
import { checkout, fetchLecture, fetchLectures, getAllCourses, getMyCourses, getSingleCourse, paymentVerification } from "../controllers/courses.controller.js";
import { isAuth } from "../middleware/isAuth.js";

const router = Router();

router.route('/course/all').get(getAllCourses);
router.route('/course/:id').get(getSingleCourse);
router.route('/lectures/:id').get(isAuth, fetchLectures);
router.route('/lecture/:id').get(isAuth, fetchLecture);
router.route('/myCourses').get(isAuth, getMyCourses);
router.route('/course/checkout/:id').post(isAuth, checkout);
router.route('/verification/:id').get(isAuth, paymentVerification);

export default router;