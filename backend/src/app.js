import express from "express";
import cors from "cors";
import UserRoute from "./routes/userRoute.js"
import { FRONTEND_URL, BACKEND_URL } from "../../frontend/public/scripts/config.js";
const app = express();

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// allow request from other origin (Frontend which is at different port)
app.use(cors({
    origin: [FRONTEND_URL, BACKEND_URL],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


// use Route
app.use("/user", UserRoute);


export default app;