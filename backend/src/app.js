import express from "express";
import cors from "cors";
import UserRoute from "./routes/userRoute.js"
import RoomRoute from "./routes/roomRoute.js"
import { FRONTEND_URL, BACKEND_URL, GOTO_URL } from "../../frontend/public/scripts/config.js";
const app = express();

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// allow request from other origin (Frontend which is at different port)
app.use(cors({
    origin: [FRONTEND_URL, BACKEND_URL, GOTO_URL],
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


// set session
app.get('/api/getUserData', async (req,res) =>{
    console.log("Authenticated:", req.session.id);
    console.log("name:", req.session.userData);
    req.session.visited = true;

    if(req.session.authenticated == undefined){
      res.status(200).json(null);
    }else if(req.session.authenticated == false){
      res.status(200).json(null);
    }else{
    res.status(200).json(req.session.userData)
    }
});



export default app;