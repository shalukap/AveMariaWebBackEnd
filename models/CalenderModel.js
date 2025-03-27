import mongoose from "mongoose";

const calenderSchema = new mongoose.Schema({
    cid:{
        type: String,
        required: true,
        unique: true
    },
    date:{
        type: Date,
        required: true
    },
    event:{
        type: String,
        required: true
    },
    enterdBy:{
        type: String,
        required: true
    }
})


const Calender = mongoose.model("calender", calenderSchema);    

export default Calender