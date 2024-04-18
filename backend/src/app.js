import express from "express";
import cors from "cors";

import UserRoute from "./routes/userRoute.js"
import session from "express-session";
const store = new session.MemoryStore();
const app = express();

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// user session
app.use(session({
    secret:"CPmon-secret",
    cookie :{
        maxAge: 400000,
        authenticated : false,
        username : ""
    },
    saveUninitialized: false,
    resave:true,
    // store
}))


// indev : to print session
// app.use((req,res,next) =>{
//     // console.log('[app.js(backend)] Session:', res.sessionStore);
//     console.log('[app.js(backend)] store:', store.session);
//     next()
// })

// allow request from other origin (Frontend which is at different port)
const corsOptions = {
    origin: 'http://localhost:3221', // indev - This should match the exact URL of your client-side application
    credentials: true, 
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


// use Route
app.use("/user", UserRoute);

export default app;