
import express from "express";
import path from 'path';
import {getCurrentUser} from "./public/scripts/api.js"
import cors from "cors";
import { FRONTEND_URL, BACKEND_URL } from "./public/scripts/config.js";
import session from "express-session";

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(path.dirname(__filename));

let publicPath = path.join(__dirname, 'frontend/public/pages')
const app = express();
app.use(express.static("public"));
app.use(express.json());


app.use(session({
    secret: 'CPmon', 
    saveUninitialized: false,
    resave:false, 
    cookie : {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge: 60000 * 60 * 24 *7
    }
}))
app.use(cors({
  origin: [FRONTEND_URL, BACKEND_URL],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));



app.get('/api/getUserData', async (req,res) =>{
  console.log("Authenticated:", req.session.id);
  console.log("visited:", req.session.visited);
  req.session.visited = true;

  if(req.session.authenticated == undefined){
    res.status(200).json(null);
  }else if(req.session.authenticated == false){
    res.status(200).json(null);
  }else{
    res.status(200).json(req.session.userData)
  }
});

app.post('/api/setUserData', async (req,res) =>{
  const { authenticated, userData } = req.body;
  req.session.authenticated = authenticated;
  req.session.userData = userData;

  res.status(200).json({
    'mes': "setUserData Success",
  });
});

app.get('/login', async (req,res) =>{
  console.log("---------------LOGIN------------------");
  console.log("check current User in login server");
  const currentUser = await getCurrentUser();

  if(currentUser==null){
    res.sendFile(`${publicPath}/login.html`)
  }else{
    res.redirect('/')
  }
});

app.get('/user', async (req,res) =>{
  const currentUser = await getCurrentUser();
  if(currentUser==null){
    res.redirect('/login')
  }else{
    res.sendFile(`${publicPath}/userData.html`)
  }
});

app.get('/', async (req,res) =>{
  const currentUser = await getCurrentUser();
  if(currentUser===null){
    res.redirect('/login')
  }else{
    res.sendFile(`${publicPath}/index.html`)
  }
});

app.get('/room/:roomID', (req,res) =>{
  res.sendFile(`${publicPath}/gameRoom.html`)
});

app.get('*', async (req,res) =>{
  const currentUser = await getCurrentUser();
  if(currentUser==null){
    res.redirect('./login')
  }else{
    res.sendFile(`${publicPath}/brokenlink.html`)
  }
});


const PORT = 3221;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Frontend Server ready at http://localhost:${PORT}`);
});
