import express from "express";

import * as userController from "../controllers/userController.js";

const router = express.Router();

router.get("/getCurrentUser", userController.getCurrentUser)
router.get("/logoutCurrentUser", userController.logoutCurrentUser)
router.post("/getData", userController.getUserData);
router.post("/login", userController.loginUser);
router.post("/signup/check", userController.checkSignUpNewUser);
router.post("/signup/addNewUser", userController.SignUpNewUser);


export default router;