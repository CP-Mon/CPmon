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

// session
import session from "express-session";

app.use(session({
    secret: 'CPmon', 
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: false,
      sameSite: 'lax',
      secure: false, 
      maxAge: 60000 * 60 * 24 * 7
    }
}));

// use Route
app.use("/user", UserRoute);
app.use("/room", RoomRoute);
app.use("/CPmon", CPmonRoute);


// set session
app.get('/api/getUserData', async (req,res) =>{
    req.session.visited = true;

    if(req.session.authenticated == undefined){
      res.status(200).json(null);
    }else if(req.session.authenticated == false){
      res.status(200).json(null);
    }else{
      const obj = {username: req.session.username}
      const userData =  await fetch(`${BACKEND_URL}/user/getUserData`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
        credentials: 'include'
      }).then((r) => r.json());
      res.status(200).json(userData)
    }
});

async function countDownTurnCountdown() {
  await fetch(`${BACKEND_URL}/room/countdown/0`,{method:"POST"}).then((r) => r.json());
  await fetch(`${BACKEND_URL}/room/countdown/1`,{method:"POST"}).then((r) => r.json());
  await fetch(`${BACKEND_URL}/room/countdown/2`,{method:"POST"}).then((r) => r.json());
  await fetch(`${BACKEND_URL}/room/countdown/3`,{method:"POST"}).then((r) => r.json());
  await fetch(`${BACKEND_URL}/room/countdown/4`,{method:"POST"}).then((r) => r.json());
  await fetch(`${BACKEND_URL}/room/countdown/5`,{method:"POST"}).then((r) => r.json());
}

const intervalId = setInterval(countDownTurnCountdown, 1000);


export default app;