
import express from "express";
import path from 'path';
import { currentUser } from "./public/scripts/config.js";

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(path.dirname(__filename));

let publicPath = path.join(__dirname, 'frontend/public/pages')
const app = express();

app.use(express.static("public"));

app.get('/user', (req,res) =>{
  if(currentUser==""){
    res.sendFile(`${publicPath}/login.html`)
  }else{
    res.sendFile(`${publicPath}/userData.html`)
  }
});

app.get('/', (req,res) =>{
  if(currentUser==""){
    res.sendFile(`${publicPath}/login.html`)
  }else{
    res.sendFile(`${publicPath}/index.html`)
  }
});

app.get('/login', (req,res) =>{
  res.sendFile(`${publicPath}/login.html`)
});

const PORT = 3221;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Frontend Server ready at http://localhost:${PORT}`);
});

