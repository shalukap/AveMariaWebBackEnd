import mongoose from "mongoose";

const sportsSchema = new mongoose.Schema({
    sportId:{
        type: String,
        required: true,
        unique: true
    },
    sportName: {
        type: String,
        required: true
    },
    sportDescription: {
        type: String,
        required: true      
        
    },
    inCharge: {
        type: String,
        required: true
    },
    image: {
        type: [String],
        
    },
    createdDate: {
        type: Date,
        required: true,        
        default: Date.now()
    }
})

const Sports = mongoose.model("sports", sportsSchema);    

export default Sports