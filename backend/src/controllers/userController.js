import { Store } from "express-session";
import app from "../app.js";
import User from "../models/userModel.js"


/* get userData by its username */
/** @type {import("express").RequestHandler} */

export const getUserData = async (req, res) => {
  console.log(req.session);
  res.status(200).json(null);
  // if((req.session.authenticated == undefined)){
  //   res.status(200).json(null);
  // }else{
  //   const username = req.session.username;
  //   const userData = await User.findOne({username:username});
  //   res.status(200).json(userData);
  // }  
};

/** @type {import("express").RequestHandler} */
export const logoutUser = async (req, res) => {
  req.session.authenticated = false
  req.session.username = null
  res.redirect('./login')
};

/** @type {import("express").RequestHandler} */
export const loginUser = async (req, res) => {
  const loginUserData = await User.findOne({username:req.body.username});
  if(req.session.authenticated==true){
    res.status(400).json({ error: "Alredy Login" });
  }
  
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
      // return userData if everything is correct
      req.session.authenticated = true;
      req.session.username = loginUserData.username
      console.log("login :", req.session); // indev
      res.status(200).json({
        mes: "Success",
        loginUserData: loginUserData
    });
    }  
  }
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
    if(sameUsername != null){
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