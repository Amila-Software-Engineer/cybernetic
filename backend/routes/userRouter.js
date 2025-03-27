import {Router} from "express";
import { allStudents} from '../controller/userController.js';
import {verifyToken, checkRole} from "../middleware/authMiddleware.js";


const userRouter = Router();

userRouter.get("/", verifyToken,checkRole('admin'), allStudents);

export default userRouter