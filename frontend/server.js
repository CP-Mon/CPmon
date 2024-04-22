
import express from "express";
import path from 'path';
import cors from "cors";
import { FRONTEND_URL, BACKEND_URL} from "./public/scripts/config.js";

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(path.dirname(__filename));

let publicPath = path.join(__dirname, 'frontend/public/pages')
const app = express();
app.use(express.static("public"));
app.use(express.json());

// allow request from other origin (Frontend which is at different port)
app.use(cors({
  origin: [FRONTEND_URL, BACKEND_URL],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.get('/', async (req,res) =>{
  res.sendFile(`${publicPath}/index.html`)
});

app.get('/user', async (req,res) =>{
  res.sendFile(`${publicPath}/userData.html`)
});

app.get('/room/:roomID', (req,res) =>{
  res.sendFile(`${publicPath}/gameRoomWaiting.html`)
});


app.get('/game/:roomID', (req,res) =>{
  res.sendFile(`${publicPath}/gameRoomFighting.html`)
});

app.get('/winner', (req,res) =>{
  res.sendFile(`${publicPath}/gameend-winner.html`)
});

app.get('/loser', (req,res) =>{
  res.sendFile(`${publicPath}/gameend-loser.html`)
});

app.get('/timeout', (req,res) =>{
  res.sendFile(`${publicPath}/gameend-timeout.html`)
});

app.get('*', async (req,res) =>{
  res.sendFile(`${publicPath}/brokenlink.html`)
});


const PORT = 3221;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Frontend Server ready at ${FRONTEND_URL}`);
});
