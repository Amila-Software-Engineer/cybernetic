import {Router} from "express";
import { createCourse, viewCourses ,updateCourse, deleteCourse,enrollStudent} from '../controller/courseController.js';
import {verifyToken, checkRole} from "../middleware/authMiddleware.js";


const courseRouter = Router();

courseRouter.post("/", verifyToken,checkRole('admin'), createCourse);
courseRouter.post("/enrole", verifyToken,checkRole('student'), enrollStudent);
courseRouter.get("/viewall",verifyToken, checkRole('admin', 'instructor','student'), viewCourses);
courseRouter.put('/courses/:id', verifyToken,checkRole('admin'), updateCourse); 
courseRouter.delete('/courses/:id',verifyToken,checkRole('admin'),  deleteCourse); 

export default courseRouter