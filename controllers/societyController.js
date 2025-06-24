import Society from '../models/societyModel.js'

export function getAllSocieties(req, res) {
    Society.find().then((result) => {
        res.json(result);
    }).catch((err) => {
        res.json(err)
    })
}



export async function getCurrentSociety(req, res) {
    const id=req.params.id
    await Society.find({socid:id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.json(err)
    })
}
export async function addSociety(req, res) {
    const user=req.user;
    if (!user) {
        res.status(401).json({ msg: "Please login" });
        return
    }
    if (user.role != "Admin" && user.role != "Author" && user.role != "Photographer") {
        res.status(401).json({ msg: "Please login as Authorized" });
        return
    }
    let lastId=await Society.find().sort({socid:-1}).limit(1);
    let socid=""
    if(lastId.length==0){
        socid="SOCID001";
    }else{
        lastId=lastId[0].socid;
        socid="SOCID"+(parseInt(lastId.substring(3))+1).toString().padStart(5,"0");
    }

    const data=req.body
    data.socid=socid
    let society=new Society(data)
    society.save().then(() => {
        res.json("New Society Added")
    }).catch((err) => {
        res.json(err)
    })
}

export function updateSociety(req, res) {
    const id=req.params.id
    const data=req.body
    Society.updateOne({socid:id},data).then(() => {
        res.json("Society Updated")
    }).catch((err) => {
        res.json(err)
    })
}

export function deleteSociety(req, res) {
    const id=req.params.id
    Society.deleteOne({socid:id}).then(() => {
        res.json("Society Deleted Successfully")
    }).catch((err) => {
        res.json(err)
    })
}