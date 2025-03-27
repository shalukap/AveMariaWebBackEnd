import User from "../models/UserModel.js";
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


dotenv.config();



export function getAllUsers(req, res) {
    User.find().then((result) => {
        res.json(result);
        
    }).catch((err) => {
        res.json(err)
    })
}
export function getCurrentUser(req, res) {
    const uid=req.params.uid
    User.find({uid:uid}).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.json(err)
    })
}


export async function registerUser(req, res) {
    const adminUser=req.user; 
    
  if(adminUser.role!="Admin"){
        res.status(401).json({msg:"Please login as admin"});
        return
    }

    let lastUid=await User.find().sort({uid:-1}).limit(1);
    let uid=""
    if(lastUid.length==0){
        uid="UID001";
    }else{
        lastUid=lastUid[0].uid;
        uid="UID"+(parseInt(lastUid.substring(3))+1).toString().padStart(3,"0");
    }

    const data=req.body
    data.uid=uid   
    data.password=bcrypt.hashSync(data.password,16)// hash the password
    let user=new User(data)
    
    user.save().then(() => {
        res.json("New User Added")
    }).catch((err) => {
        res.json(err)
    })
}

    export function loginUser(req, res) {
        const data=req.body        
        User.findOne({email:data.email}).then((user) => {
                           
            if(!user){
                res.json("User Not Found")
            }else{            
                
                if(bcrypt.compareSync(data.password,user.password)){
                    const token=jwt.sign({
                        name:user.name,
                        email:user.email,
                        phone:user.phone,
                        role:user.role
                    },process.env.SECRET_KEY,{expiresIn:"1h"})                              
                    res.cookie("token",token,{
                        httpOnly:true,
                        secure:false,
                        sameSite:"None",
                        maxAge:60*60*1000
                    })              
                                
                    res.json({msg:"Login Successfull",token:token,user:user})
                    
                    
                }else{
                    res.json("Incorrect Password")
                }
            }
        }).catch((err) => {
            res.json(err)
        })
    }
    export function verifyUser(req, res,next) {
        let token=req.header("Authorization");        
            if(token){
                token=token.replace("Bearer","");               
                jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
                    if(!err){
                        req.user=decoded;                        
                                     
                    }
                })
            }
            next();
        /*
        const token=req.cookies.token
        console.log(token);
        
    if(!token){
        res.status(401).json({msg:"Please login"});
        return
    }
    jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
        if(err){
            return res.status(403).json({msg:"Invalid token"});              
        }
        req.user=decoded
        next()
    })*/
    }
    export function logoutUser(req, res) {
        res.clearCookie("token",{
            httpOnly:true,
            secure:false,
            sameSite:"None"
        })
        res.json("Logout Successfull")
    }

    export function updateUser(req, res) {
        const uid=req.params.uid
        const data=req.body
        if (data.password) {
            data.password=bcrypt.hashSync(data.password,16)// hash the password
        }
        User.updateOne({uid:uid},data).then(() => {
            res.json("User Updated")
        }).catch((err) => {
            res.json(err)
        })
    }

