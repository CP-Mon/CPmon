import User from "../models/userModel.js"

/** @type {import("express").RequestHandler} */
export const getAllUserData = async (req, res) => {
  const userData = await User.find();
  res.status(200).json(userData);
};

/** @type {import("express").RequestHandler} */
export const loginUser = async (req, res) => {
  console.log(req.body.username, req.body.password);
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
      // return userData if everything is correct
      res.status(200).json({
        mes:"Success",
        loginUserData : loginUserData
      });
    }  
  }

  
};