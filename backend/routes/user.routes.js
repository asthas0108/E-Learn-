import { Router } from "express";
import { login, myProfile, register, verifyUser } from "../controllers/user.controller.js";
import { isAuth } from "../middleware/isAuth.js";
import { addProgress, getYourProgress } from "../controllers/courses.controller.js";

const router = Router();

router.route('/user/register').post(register);
router.route('/user/verify').post(verifyUser);
router.route('/user/login').post(login);
router.route('/user/me').get(isAuth, myProfile);
router.route('/user/progress').post(isAuth, addProgress)
router.route('/user/progress').get(isAuth, getYourProgress)

export default router;