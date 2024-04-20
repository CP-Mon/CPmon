import express from "express";

import * as roomController from "../controllers/roomController.js";

const router = express.Router();

router.get("/getRooms", roomController.getRooms);
router.get("/getRoom/:id", roomController.getRoom);

router.post("/joinRoom/:id", roomController.joinRoom);
router.post("/addPokemon/:id", roomController.addPokemon);

export default router;