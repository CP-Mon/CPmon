import express from "express";
import cors from "cors";
import UserRoute from "./routes/userRoute.js"
const app = express();

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// user session
import cookieSession from "cookie-session";
// import cookieParser from "cookie-parser";

// import session from "express-session";
import session from "express-session";
app.use(session({
    secret: 'CPmon', 
    saveUninitialized: false,
    resave:false, 
    cookie : {
        maxAge: 60000 * 60 * 24 *7
    }
}))
app.use((req,res,next)=>{
    req.session.visited = true;
    next()
})


app.use(cors({ origin: 'http://localhost:3221', credentials: true }));



// allow request from other origin (Frontend which is at different port)
// app.use(cors({ origin: 'http://localhost:3221', credentials: true }));
// app.use(cookieParser())
// app.use(cors());


// use Route
app.use("/user", UserRoute);


export default app;