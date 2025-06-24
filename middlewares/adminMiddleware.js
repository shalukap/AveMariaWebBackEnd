import jwt from 'jsonwebtoken';
import express from 'express';
const app=express();
const authUser= (req,res,next)=>{
    let token=req.header("Authorization");
    if(!token){
        res.status(401).json({msg:"Please login"});
        return;
    }
    token=token.replace("Bearer ",""); 
    jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
        if(err){
            res.status(403).json({msg:"Invalid token"});
            return;
        }
        req.user=decoded;
        const user=req.user;
        if(user.role!="Admin"){
            res.status(401).json({msg:"Please login as admin"});
            return;
       
    }
    })
    next();

}
    
      
    
export default authUser;