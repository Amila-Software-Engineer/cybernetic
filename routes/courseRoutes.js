import {Router} from "express";
import { createCourse, viewCourses , enrollStudent} from '../controller/courseController.js';
import {verifyToken, checkRole} from "../middleware/authMiddleware.js";


const courseRouter = Router();

courseRouter.post("/", verifyToken,checkRole('admin'), createCourse);
courseRouter.post("/enrole", verifyToken,checkRole('student'), enrollStudent);
courseRouter.get("/viewall",verifyToken, checkRole('admin', 'instructor','student'), viewCourses);

export default courseRouter