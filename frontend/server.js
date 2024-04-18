
import express from "express";
import path from 'path';
import {getCurrentUser} from "./public/scripts/api.js"


import { fileURLToPath } from 'url';
import { link } from "fs";
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(path.dirname(__filename));

let publicPath = path.join(__dirname, 'frontend/public/pages')
const app = express();

app.use(express.static("public"));

app.get('/user', async (req,res) =>{
  const currentUser = await getCurrentUser();
  if(currentUser==null){
    res.sendFile(`${publicPath}/login.html`)
  }else{
    res.sendFile(`${publicPath}/userData.html`)
  }
});

app.get('/', async (req,res) =>{
  const currentUser = await getCurrentUser();
  if(currentUser==null){
    res.sendFile(`${publicPath}/login.html`)
  }else{
    res.sendFile(`${publicPath}/index.html`)
  }
});

app.get('/room/:id', (req,res) =>{
  res.sendFile(`${publicPath}/gameRoom.html`)
});

app.get('*', async (req,res) =>{
  const currentUser = await getCurrentUser();
  if(currentUser==null){
    res.sendFile(`${publicPath}/login.html`)
  }else{
      res.sendFile(`${publicPath}/brokenlink.html`)
  }
});


const PORT = 3221;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Frontend Server ready at http://localhost:${PORT}`);
});

