import Calender from "../models/CalenderModel.js";
import jwt from "jsonwebtoken";


export function getAllCalenderEvents(req, res) {
    Calender.find().then((result) => {
        res.json(result);
    }).catch((err) => {
        res.json(err)
    })
}

export async function addCalenderEvent(req, res) {       
    const user=req.user; 
    if(user.role!="Admin"){
        res.status(401).json({msg:"Please login as admin"});
        return;
    }
    let lastCId=await Calender.find().sort({cid:-1}).limit(1);   
    let cid=""
    if(lastCId.length==0){
        cid="CID001";
    }else{
        lastCId=lastCId[0].cid;
        cid="CID"+(parseInt(lastCId.substring(3))+1).toString().padStart(3,"0");
    }
    const data=req.body
    data.cid=cid
    data.enterdBy=user.name
   
    
    let calender=new Calender(data);
    await calender.save().then(() => {
        res.json("New Calender Event Added")
    }).catch((err) => {
        res.json(err)
    })
    
}

export async function updateCalenderEvent(req, res) {
    const id=req.params.id
    const data=req.body

    await Calender.updateOne({cid:id},data).then(() => {
        res.json("Calender Event Updated")
    }).catch((err) => {
        res.json(err)
    })

}

export async function getCurrentCalenderEvent(req, res) {
    const id=req.params.id
    await Calender.find({cid:id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.json(err)
    })
}

export async function deleteCalenderEvent(req, res) {
    const user=req.user;   
    if (!user) {
        res.status(401).json({ msg: "Please login" });
        return
    }
    if (user.role != "Admin") {
        res.status(401).json({ msg: "Please login as Authorized" });
        return
    }
    
    const id=req.params.id
    await Calender.deleteOne({cid:id}).then(() => {
        res.json("Calender Event Deleted")
    }).catch((err) => {
        res.json(err)
    })
}