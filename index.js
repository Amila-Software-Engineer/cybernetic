import express, { json } from "express";
import appRouter from "./routes/index.js";
import {dbConnect} from "./config/dbconnection.js"
import {createAdminUser} from "./middleware/authMiddleware.js";


dbConnect();
const app = express();

// middleware 
app.use(express.json())

// create inmemory user
createAdminUser();


const PORT = process.env.PORT || 5000;

// routes
app.use("/api/v1", appRouter);


app.listen(PORT, ()=> console.log("Server running on port ", PORT)
);