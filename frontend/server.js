
import express from "express";
import path from 'path';
import {getCurrentUser} from "./public/scripts/api.js"
import cookieSession from "cookie-session";


import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(path.dirname(__filename));

let publicPath = path.join(__dirname, 'frontend/public/pages')
const app = express();

app.use(express.static("public"));

// user session
app.use(cookieSession({
  name : 'session',
  keys : ['key1', 'key2'],
  maxAge: 24 * 60 * 60 * 1000
}))


app.get('/login', async (req,res) =>{
  const currentUser = await getCurrentUser();
  if(currentUser==null){
    res.sendFile(`${publicPath}/login.html`)
  }else{
    res.redirect('./')
  }
});

app.get('/user', async (req,res) =>{
  const currentUser = await getCurrentUser();
  if(currentUser==null){
    res.redirect('./login')
  }else{
    res.sendFile(`${publicPath}/userData.html`)
  }
});

app.get('/', async (req,res) =>{
  const currentUser = await getCurrentUser();
  if(currentUser===null){
    console.log("you call home but Current User is null");
    res.redirect('./login')
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
