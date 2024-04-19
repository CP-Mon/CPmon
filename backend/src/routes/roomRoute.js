import express from "express";

import * as roomController from "../controllers/roomController.js";

const router = express.Router();

router.get("/getRooms", roomController.getRooms);

export default router;