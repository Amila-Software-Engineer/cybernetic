import {Router} from "express";
import {
    register, login
  } from "../controller/authController.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);

export default authRouter