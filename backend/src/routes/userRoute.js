import express from "express";

import * as userController from "../controllers/userController.js";

const router = express.Router();


router.post("/getUserData", userController.getUserData);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logoutUser);
router.post("/reward", userController.rewardUser);
router.post("/signup/check", userController.checkSignUpNewUser);
router.post("/signup/addNewUser", userController.SignUpNewUser);


export default router;