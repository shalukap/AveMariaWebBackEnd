import Sports from "../models/SportsModel.js";

export  function getAllSports(req, res) {
     Sports.find().then((result) => {
        res.json(result);
    });
}

export async function getCurrentSports(req, res) {
    const id = req.params.id;
   await Sports.find({ sportId: id }).then((result) => {
        res.json(result);
    });
}

export async function addSports(req, res) {
    let lastSptId = await Sports.find().sort({ sportId: -1 }).limit(1);
    let sportId = "";
    if (lastSptId.length == 0) {
        sportId = "SPT0001";
    } else {
        lastSptId = lastSptId[0].sportId;
        sportId = "SPT" + (parseInt(lastSptId.substring(4)) + 1).toString().padStart(3, "0");
    }
    const data = req.body;
    data.sportId = sportId;
    let sports = new Sports(data);
    await sports.save().then(() => {
        res.json("New Sport Added");
    });
}

export async function updateSports(req, res) {
    const id = req.params.id;
    const data = req.body;
    await Sports.updateOne({ sportId: id }, data).then(() => {
        res.json("Sport Updated");
    });
}

export async function deleteSports(req, res) {
    const id = req.params.id;
    await Sports.deleteOne({ sportId: id }).then(() => {
        res.json("Sport Deleted Successfully");
    });
}

