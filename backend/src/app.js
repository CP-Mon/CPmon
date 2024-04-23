import express from "express";
import cors from "cors";
import UserRoute from "./routes/userRoute.js"
import RoomRoute from "./routes/roomRoute.js"
import CPmonRoute from "./routes/CPmonRoute.js"
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
app.use("/room", RoomRoute);
app.use("/CPmon", CPmonRoute);



async function countDownTurnCountdown() {
  await fetch(`${BACKEND_URL}/room/countdown/0`,{method:"POST"}).then((r) => r.json());
  await fetch(`${BACKEND_URL}/room/countdown/1`,{method:"POST"}).then((r) => r.json());
  await fetch(`${BACKEND_URL}/room/countdown/2`,{method:"POST"}).then((r) => r.json());
  await fetch(`${BACKEND_URL}/room/countdown/3`,{method:"POST"}).then((r) => r.json());
  await fetch(`${BACKEND_URL}/room/countdown/4`,{method:"POST"}).then((r) => r.json());
  await fetch(`${BACKEND_URL}/room/countdown/5`,{method:"POST"}).then((r) => r.json());
  await fetch(`${BACKEND_URL}/room/countdown/6`,{method:"POST"}).then((r) => r.json());
  await fetch(`${BACKEND_URL}/room/countdown/7`,{method:"POST"}).then((r) => r.json());
  await fetch(`${BACKEND_URL}/room/countdown/8`,{method:"POST"}).then((r) => r.json());
  await fetch(`${BACKEND_URL}/room/countdown/9`,{method:"POST"}).then((r) => r.json());
  await fetch(`${BACKEND_URL}/room/countdown/10`,{method:"POST"}).then((r) => r.json());
  await fetch(`${BACKEND_URL}/room/countdown/11`,{method:"POST"}).then((r) => r.json());
}

const intervalId = setInterval(countDownTurnCountdown, 1000);


export default app;