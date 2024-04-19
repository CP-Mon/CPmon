import User from "../models/userModel.js"
import {FRONTEND_URL} from "../../../frontend/public/scripts/config.js"


/** @type {import("express").RequestHandler} */
export const loginUser = async (req, res) => {
  console.log("Check if log in");
  const currentUserData =  await fetch(`${FRONTEND_URL}/api/getUserData`,{
      credentials: 'include'
  }).then((r) => r.json());
  if(currentUserData!= null){
    res.status(400).json({ error: "Alredy Login" });
  }

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
      const obj = {authenticated : true, userData: loginUserData}
      const respond = await fetch(`${FRONTEND_URL}/api/setUserData`,{
          method : 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(obj),
          credentials: "include",
      }).then((r) => r.json());

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