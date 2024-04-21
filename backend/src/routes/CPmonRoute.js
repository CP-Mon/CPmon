import express from "express";

import * as CPmonController from "../controllers/CPmonController.js";

const router = express.Router();

router.post("/getCPmonStatus", CPmonController.getCPmonStatus);

export default router;