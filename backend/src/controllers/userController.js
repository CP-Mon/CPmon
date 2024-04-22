import User from "../models/userModel.js"
import {BACKEND_URL, FRONTEND_URL} from "../../../frontend/public/scripts/config.js"

/** @type {import("express").RequestHandler} */
export const getUserData = async (req, res) => {
  const userData = await User.findOne({username:req.body.username});
  res.status(200).json(userData);
};

/** @type {import("express").RequestHandler} */
export const loginUser = async (req, res) => {
  const loginUserData = await User.findOne({username:req.body.username});

  // check if username is valid
  if(loginUserData==null){
    res.status(200).json({
      mes:"NoUsername"
    });
  }else{
    // check if password is correct
    if(loginUserData.password != req.body.password){
      res.status(200).json({
        mes:"WrongPassword"
      });
    }else{
      req.session.authenticated = true;
      req.session.username = loginUserData.username;
      res.status(200).json({
        mes: "Success",
        loginUserData: loginUserData
    });
    }  
  }
};

/** @type {import("express").RequestHandler} */
export const logoutUser = async (req, res) => {
  req.session.authenticated = false;
  req.session.username = null;
  res.status(200).json({mes: "Success"});
};

/** @type {import("express").RequestHandler} */
export const checkSignUpNewUser = async (req, res) => {
  const sameUsername = await User.findOne({username:req.body.username});
  const sameEmail = await User.findOne({email:req.body.email});


  // check if username & email is not duplicate
  if(sameUsername==null & sameEmail==null){
    res.status(200).json({
      mes:"Pass",
    });
  }else{
    // check if username is duplicate
    if(sameUsername != null || req.body.username == "error-timeout"){
      res.status(200).json({
        mes:"DuplicateUsername",
      });
    }else if(sameEmail!=null){
      // check if email is duplicate
      res.status(200).json({
        mes:"DuplicateEmail",
      });
    }else{
      res.status(404);
    }
  }
};

/** @type {import("express").RequestHandler} */
export const SignUpNewUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();

    res.status(200).json({ message: "OK" });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ error: "Bad Request" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};

/** @type {import("express").RequestHandler} */
export const rewardUser = async (req, res) => {
  const userData = await User.findOne({username:req.body.username});

  // check if username is valid
  if(userData==null){
    res.status(200).json({
      mes:"NoUsername"
    });
  }else{
    const exp = parseInt(req.body.exp)
    const money = parseInt(req.body.money)

    userData.exp += exp
    userData.money += money
    await userData.save()
    res.status(200).json({
      mes:"success"
    });
  }
};