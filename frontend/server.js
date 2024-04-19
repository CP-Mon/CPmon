
import express from "express";
import path from 'path';
import {getCurrentUser} from "./public/scripts/api.js"
import cors from "cors";
import { FRONTEND_URL, BACKEND_URL, GOTO_URL } from "./public/scripts/config.js";

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(path.dirname(__filename));

let publicPath = path.join(__dirname, 'frontend/public/pages')
const app = express();
app.use(express.static("public"));
app.use(express.json());

app.use(cors({
  origin: [FRONTEND_URL, BACKEND_URL, GOTO_URL],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.get('/login', async (req,res) =>{
  res.sendFile(`${publicPath}/login.html`)
});

app.get('/', async (req,res) =>{
  res.sendFile(`${publicPath}/index.html`)
});

app.get('/user', async (req,res) =>{
  res.sendFile(`${publicPath}/userData.html`)
});

app.get('/room/:roomID', (req,res) =>{
  res.sendFile(`${publicPath}/gameRoom.html`)
});

app.get('*', async (req,res) =>{
  res.sendFile(`${publicPath}/brokenlink.html`)
});


const PORT = 3221;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Frontend Server ready at http://localhost:${PORT}`);
});
