import Society from '../models/societyModel.js'

export function getAllSocieties(req, res) {
    Society.find().then((result) => {
        res.json(result);
    }).catch((err) => {
        res.json(err)
    })
}

export function getCurrentSociety(req, res) {
    const id=req.params.id
    Society.find({socid:id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.json(err)
    })
}
export function addSociety(req, res) {
    const data=req.body
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