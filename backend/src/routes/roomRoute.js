import express from "express";

import * as roomController from "../controllers/roomController.js";

const router = express.Router();

router.get("/getRooms", roomController.getRooms);
router.get("/getRoom/:id", roomController.getRoom);

router.post("/clearRoom/:id", roomController.clearRoom);
router.post("/joinRoom/:id", roomController.joinRoom);
router.post("/addPokemon/:id", roomController.addPokemon);
router.post("/removePlayer/:id", roomController.removePlayer);
router.post("/ready/:id", roomController.ready);
router.post("/action/:id", roomController.action);

export default router;