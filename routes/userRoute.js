import express from "express";
import { getAllUsers, getCurrentUser, loginUser, registerUser, verifyUser, logoutUser,updateUser } from "../controllers/userController.js";

let userRouter = express.Router();

userRouter.get("/",getAllUsers);
userRouter.get("/:uid",getCurrentUser);
userRouter.post("/register",verifyUser,registerUser);
userRouter.post("/login",loginUser);
userRouter.post("/logout",logoutUser);
userRouter.put("/:uid",verifyUser,updateUser);


export default userRouter;

/*
[
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "abcd123",
    "role": "Admin",
    "phone": "+1234567890"
  },
  {
    "name": "Jane Smith",
    "email": "janesmith@example.com",
    "password": "securepass456",
    "role": "Author",
    "phone": "+1987654321"
  },
  {
    "name": "Michael Johnson",
    "email": "michaelj@example.com",
    "password": "pass987654",
    "role": "Photographer",
    "phone": "+1122334455"
  },
  {
    "name": "Emily Brown",
    "email": "emilybrown@example.com",
    "password": "emilysecure123",
    "role": "Author",
    "phone": "+1555666777"
  },
  {
    "name": "David Wilson",
    "email": "davidwilson@example.com",
    "password": "davidpass789",
    "role": "Admin",
    "phone": "+1444333222"
  },

  {
    "name": "Shaluka Perera",
    "email": "shaluka@gmail.com",
    "password": "abc123",
    "role": "Admin",
    "phone": "123-456-7890"
  }
    
]

 {
        
        "email":"shaluka@gmail.com",
        "password":"abc123"
     
    }
*/