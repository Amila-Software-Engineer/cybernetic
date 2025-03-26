import { Router } from "express";
import authRouter from "./authRoutes.js";
import courseRouter from "./courseRoutes.js";

const appRouter = Router();

appRouter.use("/auth", authRouter); //domain/api/v1/auth
appRouter.use("/courses", courseRouter); //domain/api/v1/auth

export default appRouter;

