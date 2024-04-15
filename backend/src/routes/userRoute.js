import express from "express";

import * as userController from "../controllers/userController.js";

const router = express.Router();

router.get("/", userController.getAllUserData);
router.post("/login", userController.loginUser);


export default router;