import express from "express";

import * as userController from "../controllers/userController.js";

const router = express.Router();


router.get("/getData", userController.getUserData);
router.post("/logout", userController.logoutUser);
router.post("/login", userController.loginUser);
router.post("/signup/check", userController.checkSignUpNewUser);
router.post("/signup/addNewUser", userController.SignUpNewUser);


export default router;