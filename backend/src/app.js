import express from "express";
import cors from "cors";

import CPmon from "./models/CPmonModel.js";
import Status from "./models/statusModel.js";

import UserRoute from "./routes/userRoute.js"

const app = express();

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allow request from other origin (Frontend which is at different port)
app.use(cors());

// use Route
app.use("/user", UserRoute);

const beam = new CPmon(
    "beam", 
    new Status(10, 10, 10, 3, 10, 10)
);
console.log(beam);
export default app;

// Nadeem : test and debug - can erase
// const pikachu = new CPmon(
//     "pikachu", 
//     new Status(10, 10, 10, 10, 10, 10)
// );

// const beam = new CPmon(
//     "beam", 
//     new Status(10, 10, 10, 3, 10, 10)
// );


// console.log(beam.status.hp);
// pikachu.attack(beam)
// console.log(beam.status.hp);
